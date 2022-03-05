import { Injectable, Logger } from '@nestjs/common';
import { SellDTO } from '@pot-back/common';
import { of } from 'await-of';
import { DateUtil, TimePeriod } from '../../common/classes/date-util';
import { calculatePercentOfNumber } from '../../common/functions/calculate-percent-of-number';
import { BonusService } from '../bonus/bonus.service';
import { PaymentService } from '../payment/payment.service';
import { SteamBotEntity } from '../steam-bot/steam-bot.entity';
import { SteamEconItem } from '../steam-bot/steam-bot.interfaces';
import { SteamBotService } from '../steam-bot/steam-bot.service';
import { UserInventoryService } from '../user-inventory/user-inventory.service';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { UserDeclinedTradeException } from './exceptions/user-declined-trade.exception';
import { EXECUTE_PAYOUT_CHECK_STAGE_JOB, MOVE_TO_PAYOUT_STAGE_JOB } from './sell.constants';
import { SellStatus } from './sell.entity';
import { SellGateway } from './sell.gateway';
import { SellService } from './sell.service';

@Injectable()
export class SellFacade {
  constructor(
    private sellService: SellService,
    private steamBotService: SteamBotService,
    private sellGateway: SellGateway,
    private bonusService: BonusService,
    private userService: UserService,
    private logger: Logger,
    private paymentService: PaymentService,
    private userInventoryService: UserInventoryService,
  ) {}

  public async accept(id: number) {
    const steamBot = await this.steamBotService.linkFreeBotToSell(id);

    try {
      const sell = await this.sellService.acceptSell(id);
      this.sellGateway.sellStatusChanged(sell.user.id.toString(), {
        id: sell.id,
        status: SellStatus.AcceptedBySupport,
      });

      await this.sellService.addExecuteTradeStageJob({ sellId: id });
    } catch (e) {
      await this.steamBotService.freeBot(steamBot.accountName);
    }
  }

  public async executeTradeStage(id: number) {
    const { user, bot, items } = await this.sellService.getById(id);
    const steamEconItems: SteamEconItem[] = items.map(({ assetid, contextid, appid }) => ({
      assetid,
      contextid,
      appid,
    }));

    let [sendTradeOfferResult, err] = await of(
      this.steamBotService.sendTradeOffer({
        accountName: bot.accountName,
        theirItems: steamEconItems,
        tradeOfferLink: user.tradeOfferLink,
        giveTF2Item: true,
      }),
    );

    const isTradeNotSent = !!(err || sendTradeOfferResult?.status !== 'sent');
    if (isTradeNotSent) {
      // @ts-ignore
      if (err?.data?.message?.includes('Not Logged In')) {
        try {
          await this.steamBotService.refreshBotCookies(bot.accountName);
          return await this.executeTradeStage(id);
        } catch (err) {
          const context = `${SellFacade.name}.executeTradeStage`;
          this.logger.log(err.message, context);
        }
      }

      return await this.makeSellFailed(bot, id, user, err);
    }

    const { tradeId, myItems } = sendTradeOfferResult;

    // @ts-ignore
    const givenItem = { name: myItems[0]?.market_hash_name, image: myItems[0]?.getImageURL() };
    const acceptTradeUntil = DateUtil.addPeriodToNow(TimePeriod.Minute, 10);

    await this.sellService.updateTradeId(id, tradeId);
    await this.sellService.updateGivenItem(id, givenItem);
    await this.sellService.updateSellStatus(id, SellStatus.WaitingUserTradeConfirmation);
    await this.sellService.updateAcceptTradeUntil(id, acceptTradeUntil);

    this.sellGateway.sellStatusChanged(user.id.toString(), {
      id: id,
      status: SellStatus.WaitingUserTradeConfirmation,
      tradeId,
      // @ts-ignore
      bot: {
        name: bot.name,
        avatar: bot.avatar,
        profileUrl: bot.profileUrl,
      },
      givenItem,
      items: items.splice(0, 3).filter(item => item),
      acceptTradeUntil,
    });

    await this.sellService.addRepeatableMoveToPayoutStageJob({ sellId: id }, 60_000);
  }

  public async moveToPayoutStage(sellId: number) {
    const sell = await this.sellService.getById(sellId);
    const [isAcceptedTrade, err] = await of(this.sellService.checkIfUserAcceptedTrade(sellId));

    if (err) {
      const isDeclinedTrade = err instanceof UserDeclinedTradeException;
      if (isDeclinedTrade) {
        await this.steamBotService.freeBot(sell.bot.accountName);
        await this.sellService.updateSellStatus(sellId, SellStatus.TradeDeclinedByUser);
        await this.sellService.removeJob(['delayed'], MOVE_TO_PAYOUT_STAGE_JOB, sellId);
        this.sellGateway.sellStatusChanged(sell.user.id.toString(), {
          id: sellId,
          status: SellStatus.TradeDeclinedByUser,
        });
      }

      return;
    }

    if (isAcceptedTrade) {
      await this.userInventoryService.deleteItemsByAssetIds(sell.items.map(item => item.assetid));
      await this.steamBotService.deactivateBot(sell.bot.accountName);
      await this.sellService.removeJob(['delayed'], MOVE_TO_PAYOUT_STAGE_JOB, sellId);

      await this.sellService.updateSellStatus(sellId, SellStatus.TradeAcceptedByUser);
      this.sellGateway.sellStatusChanged(sell.user.id.toString(), {
        id: sell.id,
        status: SellStatus.TradeAcceptedByUser,
      });

      const isAllItemsReceived = await this.sellService.checkIfAllItemsReceived(sellId);
      if (!isAllItemsReceived) {
        return await this.makeSellFailed(sell.bot, sell.id, sell.user, new Error('Not all items present'));
      }

      await this.sellService.updateSellStatus(sellId, SellStatus.PayRequestToMerchant);
      this.sellGateway.sellStatusChanged(sell.user.id.toString(), {
        id: sell.id,
        status: SellStatus.PayRequestToMerchant,
      });

      return await this.sellService.addExecutePayoutStageJob({ sellId });
    }

    const isTradeAcceptTimeoutExceeded = sell.acceptTradeUntil?.getTime() <= Date.now();
    if (isTradeAcceptTimeoutExceeded) {
      await this.sellService.cancelSellCauseTradeTimeoutExceeded(sell.id);
      if (sell.bot && sell.tradeId) {
        await this.steamBotService.cancelTradeOffer({ accountName: sell.bot.accountName, tradeId: sell.tradeId });
        this.sellGateway.sellStatusChanged(sell.user.id.toString(), {
          id: sell.id,
          status: SellStatus.TradeTimeoutExceeded,
        });

        await this.sellService.removeJob(['delayed'], MOVE_TO_PAYOUT_STAGE_JOB, sell.id);
      }
    }
  }

  public async executePayoutStage(sellId: number) {
    const sell = await this.sellService.getById(sellId);
    const { user, totalItemsPrice } = sell;

    const totalSumOfCompletedSales = await this.sellService.getTotalSumOfCompletedSales(user.id);
    const newTotalSumOfCompletedSales = +(totalSumOfCompletedSales + totalItemsPrice).toFixed(2);
    const newDiscount = this.bonusService.getUserDiscount(newTotalSumOfCompletedSales);
    if (newDiscount !== user.discount) {
      await this.userService.updateDiscount(user.id, newDiscount);
    }

    if (user.referrerId) {
      const referrer = await this.userService.getById(user.referrerId);
      const referrerProfit = calculatePercentOfNumber(referrer.percentFromReferralSales, totalItemsPrice);
      await this.userService.increaseProfitForReferrer(user.id, referrerProfit);
      await this.userService.increaseBalance(referrer.id, referrerProfit);
      await this.userService.increaseProfitFromReferrals(referrer.id, referrerProfit);
    }

    const [payment, error] = await of(
      this.paymentService.payoutToUser({
        amountSendInUSD: sell.totalItemsPrice,
        purse: sell.purse,
        ip: sell.ip,
        provider: sell.paymentProvider as SellDTO.CreateSell['paymentProvider'],
        email: sell.email,
        userAgent: sell.userAgent,
        userId: sell.user.id,
      }),
    );

    if (error) {
      await this.sellService.updateSellStatus(sell.id, SellStatus.PayDeclinedByMerchant);
      this.sellGateway.sellStatusChanged(sell.user.id.toString(), {
        id: sell.id,
        status: SellStatus.PayDeclinedByMerchant,
      });
    } else {
      await this.sellService.updatePayment(sell.id, payment.id);

      await this.sellService.addRepeatableExecutePayoutCheckStageJob({ sellId: sell.id }, 30_000);
    }
  }

  public async executePayoutCheckStage(sellId: number) {
    const sell = await this.sellService.getById(sellId);
    const { status, status_text } = await this.paymentService.getMineExchangePaymentStatus(sell.paymentId);

    const getErrorMessage = () => {
      return `#${sell.paymentId}-${status}.Error while checking payout, ${status_text}`;
    };

    const removePayoutCheckJob = async () => {
      await this.sellService.removeJob(['delayed'], EXECUTE_PAYOUT_CHECK_STAGE_JOB, sell.id);
    };

    switch (status) {
      case 'error':
        this.logger.warn(getErrorMessage(), 'PaymentService.payoutToUser');
        break;
      case 'order_error':
        await this.paymentService.updatePaymentStatusToError(sell.paymentId, status_text);
        this.logger.warn(getErrorMessage(), 'PaymentService.payoutToUser');

        await this.sellService.updateSellStatus(sell.id, SellStatus.PayDeclinedByMerchant);
        this.sellGateway.sellStatusChanged(sell.user.id.toString(), {
          id: sell.id,
          status: SellStatus.PayDeclinedByMerchant,
        });

        await removePayoutCheckJob();
        break;
      case 'payout_error':
        await this.paymentService.updatePaymentStatusToError(sell.paymentId, status_text);
        this.logger.warn(getErrorMessage(), 'PaymentService.payoutToUser');

        await this.sellService.updateSellStatus(sell.id, SellStatus.PayDeclinedByMerchant);
        this.sellGateway.sellStatusChanged(sell.user.id.toString(), {
          id: sell.id,
          status: SellStatus.PayDeclinedByMerchant,
        });

        await removePayoutCheckJob();
        break;
      case 'success':
        await this.paymentService.updatePaymentStatusToSuccess(sell.paymentId);

        await this.sellService.updateSellStatus(sell.id, SellStatus.Completed);
        this.sellGateway.sellStatusChanged(sell.user.id.toString(), { id: sell.id, status: SellStatus.Completed });

        await removePayoutCheckJob();
        break;
    }
  }

  public async getUserSalesSum(userId: number) {
    return await this.sellService.getTotalSumOfCompletedSales(userId);
  }

  private async makeSellFailed(bot: SteamBotEntity, id: number, user: UserEntity, err: Error) {
    await this.steamBotService.freeBot(bot.accountName);
    await this.sellService.updateSellStatus(id, SellStatus.Failed);
    await this.sellService.updateError(id, err.constructor.name);
    this.sellGateway.sellStatusChanged(user.id.toString(), {
      id,
      status: SellStatus.Failed,
      error: err.constructor.name,
    });
  }
}
