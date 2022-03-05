import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { SellDTO } from '@pot-back/common';
import { of } from 'await-of';
import { Queue, JobStatus } from 'bull';
import { BullAdapter, setQueues } from 'bull-board';
import { Connection, In, QueryRunner, Repository } from 'typeorm';
import { DomainException } from '../../common/exceptions/domain.exception';
import { SellVariation } from '../admin-settings/admin-settings.entity';
import { AdminSettingsService } from '../admin-settings/admin-settings.service';
import { NoFreeBotException } from '../steam-bot/exceptions/no-free-bot.exception';
import { SteamBotService } from '../steam-bot/steam-bot.service';
import { UserInventoryService } from '../user-inventory/user-inventory.service';
import { UserEntity } from '../user/user.entity';
import { CannotCancelSellException } from './exceptions/cannot-cancel-sell.exception';
import { NoTradeLinkException } from './exceptions/no-trade-link.exception';
import { PricesChangedException } from './exceptions/prices-changed.exception';
import { SalesTemporarilyDisabledException } from './exceptions/sales-temporarily-disabled.exception';
import { SellNotFoundException } from './exceptions/sell-not-found.exception';
import { UserDeclinedTradeException } from './exceptions/user-declined-trade.exception';
import { YouAlreadyHaveActiveSell } from './exceptions/you-alredy-have-active-sell.exception';
import { SellItemEntity } from './sell-item.entity';
import {
  MOVE_TO_PAYOUT_STAGE_JOB,
  SELL_QUEUE,
  EXECUTE_TRADE_STAGE_JOB,
  EXECUTE_PAYOUT_STAGE_JOB,
  EXECUTE_PAYOUT_CHECK_STAGE_JOB,
} from './sell.constants';
import { GivenItem, SellEntity, SellStatus } from './sell.entity';
import {
  MoveToPayoutStageJob,
  ExecuteTradeStageJob,
  TradeOfferState,
  ExecutePayoutStageJob,
  ExecutePayoutCheckStageJob,
} from './sell.interfaces';

@Injectable()
export class SellService {
  constructor(
    @InjectRepository(SellItemEntity) private sellItemEntity: Repository<SellItemEntity>,
    @InjectRepository(SellEntity) private sellRepository: Repository<SellEntity>,
    private userInventoryService: UserInventoryService,
    @InjectQueue(SELL_QUEUE) private sellQueue: Queue,
    @InjectConnection() private connection: Connection,
    private steamBotService: SteamBotService,
    private adminSettingsService: AdminSettingsService,
  ) {
    setQueues([new BullAdapter(this.sellQueue)]);
  }

  public async removeJob(status: JobStatus[], name: string, sellId: number) {
    const jobs = await this.sellQueue.getJobs(status);
    for await (const job of jobs) {
      if (job.name === name && job.data?.sellId === sellId) {
        await job.remove();
      }
    }
  }

  public async addExecuteTradeStageJob(jobData: ExecuteTradeStageJob) {
    await this.sellQueue.add(EXECUTE_TRADE_STAGE_JOB, jobData);
  }

  public async addRepeatableMoveToPayoutStageJob(jobData: MoveToPayoutStageJob, intervalMs: number) {
    await this.sellQueue.add(MOVE_TO_PAYOUT_STAGE_JOB, jobData, { repeat: { every: intervalMs } });
  }

  public async addExecutePayoutStageJob(jobData: ExecutePayoutStageJob) {
    await this.sellQueue.add(EXECUTE_PAYOUT_STAGE_JOB, jobData);
  }

  public async addRepeatableExecutePayoutCheckStageJob(jobData: ExecutePayoutCheckStageJob, intervalMs: number) {
    await this.sellQueue.add(EXECUTE_PAYOUT_CHECK_STAGE_JOB, jobData, { repeat: { every: intervalMs } });
  }

  public async getById(id: number) {
    return this.sellRepository.findOne({ id }, { relations: ['items', 'bot', 'user'] });
  }

  public async create(dto: SellDTO.CreateSell, user: UserEntity, options: { ip: string; userAgent: string }) {
    const adminSettings = await this.adminSettingsService.get();
    if (!adminSettings.isSalesEnabled) {
      throw new SalesTemporarilyDisabledException();
    }

    if (!user.tradeOfferLink) {
      throw new NoTradeLinkException();
    }
    const { items, paymentProvider, purse, email } = dto;

    const sellItems: SellItemEntity[] = [];
    let totalItemsPrice = 0;

    for await (const item of items) {
      const userInventoryItem = await this.userInventoryService.getUserItemById(user.id, item.id);
      if (!userInventoryItem || userInventoryItem?.isBlacklisted || userInventoryItem?.price !== item.price) {
        throw new PricesChangedException();
      }

      const sellItem = new SellItemEntity();
      sellItem.appid = userInventoryItem.game;
      sellItem.assetid = userInventoryItem.assetId;
      sellItem.name = userInventoryItem.name;
      sellItem.image = userInventoryItem.image;
      sellItem.price = Number(userInventoryItem.price);
      sellItem.rubPrice = Number(userInventoryItem.rubPrice);
      sellItem.gems = userInventoryItem.gems;
      sellItem.stickers = userInventoryItem.stickers;
      sellItem.rarity = userInventoryItem.rarity;
      sellItem.rarityColor = userInventoryItem.borderColor;

      totalItemsPrice += sellItem.price;
      totalItemsPrice = Number(totalItemsPrice.toFixed(2));

      sellItems.push(sellItem);
    }

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');
    const sellRepository = queryRunner.manager.getRepository(SellEntity);

    try {
      const haveActiveSell = await this.getUserActiveSellWithQueryRunner(user.id, queryRunner);
      if (haveActiveSell) {
        throw new YouAlreadyHaveActiveSell();
      }

      const sell = new SellEntity();
      sell.user = user;
      sell.items = sellItems;
      sell.totalItemsPrice = totalItemsPrice;
      sell.ip = options.ip;
      sell.userAgent = options.userAgent;
      sell.paymentProvider = paymentProvider;
      sell.purse = purse;
      sell.email = email;

      if (adminSettings.sellVariation === SellVariation.Automatic) {
        const bot = await this.steamBotService.getFreeBotWithQueryRunner(queryRunner);
        if (!bot) throw new NoFreeBotException();

        sell.bot = bot;
        sell.status = SellStatus.AcceptedBySupport;
      }

      const savedSell = await sellRepository.save(sell);
      await queryRunner.commitTransaction();

      if (adminSettings.sellVariation === SellVariation.Automatic) {
        await this.addExecuteTradeStageJob({ sellId: savedSell.id });
      }

      return savedSell;
    } catch (err) {
      await queryRunner.rollbackTransaction();

      if (DomainException.prototype.isPrototypeOf(err)) throw err;
      else throw new Error(err.message);
    } finally {
      await queryRunner.release();
    }
  }

  public async acceptSell(id: number) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');

    try {
      const sellRepository = queryRunner.manager.getRepository(SellEntity);
      const sell = await sellRepository.findOne({
        where: { id, status: SellStatus.WaitingSupportAccept },
        relations: ['items', 'user'],
      });

      if (!sell) throw new SellNotFoundException();

      sell.status = SellStatus.AcceptedBySupport;
      await sellRepository.save(sell);
      await queryRunner.commitTransaction();

      return sell;
    } catch (err) {
      await queryRunner.rollbackTransaction();

      if (DomainException.prototype.isPrototypeOf(err)) throw err;
      else throw new Error(err.message);
    } finally {
      await queryRunner.release();
    }
  }

  public async getUserActiveSellWithQueryRunner(userId: number, queryRunner: QueryRunner) {
    return await queryRunner.manager.findOne(SellEntity, {
      where: {
        user: { id: userId },
        status: In([
          SellStatus.WaitingSupportAccept,
          SellStatus.AcceptedBySupport,
          SellStatus.WaitingUserTradeConfirmation,
        ]),
      },
    });
  }

  public async updateGivenItem(id: number, givenItem: GivenItem) {
    await this.sellRepository.update(id, { givenItem });
  }

  public async checkIfUserAcceptedTrade(id: number) {
    const sell = await this.sellRepository.findOne({ id }, { relations: ['bot'] });
    const [offer, err] = await of(
      this.steamBotService.getTradeOffer({
        accountName: sell.bot.accountName,
        tradeId: sell.tradeId,
      }),
    );

    console.log(err + 'sell check if accepted ');
    if (err) throw err;

    console.log(offer.itemsToReceive);
    console.log(offer.state);

    const declinedTradeStates = [
      TradeOfferState.Canceled,
      TradeOfferState.CanceledBySecondFactor,
      TradeOfferState.Countered,
      TradeOfferState.Declined,
      TradeOfferState.Invalid,
      TradeOfferState.InvalidItems,
      TradeOfferState.InEscrow,
    ];

    if (offer.state === TradeOfferState.Accepted) return true;
    else if (declinedTradeStates.includes(offer.state)) throw new UserDeclinedTradeException();
    else return false;
  }

  public async updateTradeId(id: number, tradeId: string) {
    await this.sellRepository.update({ id }, { tradeId });
  }

  public async updateSellStatus(id: number, status: SellStatus) {
    await this.sellRepository.update({ id }, { status });
  }

  public async updateError(id: number, error: string) {
    await this.sellRepository.update({ id }, { error });
  }

  public async updatePayment(id: number, paymentId: number) {
    await this.sellRepository.update({ id }, { payment: { id: paymentId } });
  }

  public async cancelSellCauseTradeTimeoutExceeded(id: number) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');

    try {
      const repository = queryRunner.manager.getRepository(SellEntity);
      const sell = await repository.findOne(
        { id, status: SellStatus.WaitingUserTradeConfirmation },
        { relations: ['bot'] },
      );
      if (!sell) throw new CannotCancelSellException();

      sell.bot = null;
      sell.status = SellStatus.TradeTimeoutExceeded;

      await repository.save(sell);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();

      if (DomainException.prototype.isPrototypeOf(err)) throw err;
      else throw new Error(err.message);
    } finally {
      await queryRunner.release();
    }
  }

  public async checkIfAllItemsReceived(sellId: number) {
    const sell = await this.sellRepository.findOne({ id: sellId }, { relations: ['bot', 'items'] });
    const tradeOffer = await this.steamBotService.getTradeOffer({
      tradeId: sell.tradeId,
      accountName: sell.bot.accountName,
    });

    return sell.items.every(item =>
      tradeOffer.itemsToReceive.find(itemToReceive => itemToReceive.assetid === item.assetid),
    );
  }

  public async updateAcceptTradeUntil(sellId: number, acceptTradeUntil: Date) {
    await this.sellRepository.update(sellId, { acceptTradeUntil });
  }

  public async getActiveSell(userId: number) {
    return await this.sellRepository.findOne({
      where: {
        status: In([
          SellStatus.WaitingSupportAccept,
          SellStatus.AcceptedBySupport,
          SellStatus.WaitingUserTradeConfirmation,
          SellStatus.TradeAcceptedByUser,
          SellStatus.PayRequestToMerchant,
          SellStatus.PayAcceptedByMerchant,
        ]),
        user: { id: userId },
      },
      relations: ['bot', 'items'],
    });
  }

  public async getTotalSumOfCompletedSales(userId: number) {
    const result = await this.sellRepository
      .createQueryBuilder('s')
      .select('s."userId"')
      .addSelect('SUM(s.total_items_price)', 'totalSumOfSales')
      .where('s."userId" = :userId', { userId })
      .andWhere('s.status = :status', { status: SellStatus.Completed })
      .groupBy('s."userId"')
      .getRawOne();

    return Number(result?.totalSumOfSales || 0);
  }

  public async getLastItemsOfCompletedTrades() {
    return await this.sellItemEntity
      .createQueryBuilder('item')
      .leftJoin('item.sell', 'sell')
      .where('sell.status = :status', { status: SellStatus.Completed })
      .orderBy('item.id', 'DESC')
      .limit(6)
      .getMany();
  }
}
