import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, QueryRunner, Repository } from 'typeorm';
import { SteamBotEntity } from './steam-bot.entity';
import { SteamBot } from './steam-bot';
import { of } from 'await-of';
import { SendTradeOfferDTO } from './dtos/send-trade-offer.dto';
import { GetTradeOfferDTO } from './dtos/get-trade-offer-dto';
import { CancelTradeOfferDTO } from './dtos/cancel-trade-offer.dto';
import { InvalidProxyException } from './exceptions/invalid-proxy.exception';
import { BotDontHaveItemsException } from './exceptions/bot-dont-have-items.exception';
import { InvalidMaFileException } from './exceptions/invalid-ma-file.exception';
import { UncaughtSteamErrorException } from './exceptions/uncaught-steam-error.exception';
import { NoFreeBotException } from './exceptions/no-free-bot.exception';
import { DomainException } from '../../common/exceptions/domain.exception';
import { BotNotFoundException } from './exceptions/bot-not-found.exception';
import { SendTradeOfferOptions } from './steam-bot.interfaces';
import { YouAreTradeBannedException } from './exceptions/you-are-trade-banned.exception';
import { YouCannotTradeException } from './exceptions/you-cannot-trade.exception';
import { SteamItemServerUnavailableException } from './exceptions/steam-item-server-unavailable.exception';
import { Game, SteamBotDTO } from '@pot-back/common';
import { InvalidItemsInTradeException } from './exceptions/invalid-items-in-trade.exception';
import { camelCase } from 'lodash';

@Injectable()
export class SteamBotService {
  constructor(
    @InjectRepository(SteamBotEntity) private steamBotRepository: Repository<SteamBotEntity>,
    @InjectConnection() private connection: Connection,
  ) {}

  public async create(dto: SteamBotDTO.CreateSteamBot) {
    const { accountName, password, maFile, proxy, isAdmin } = dto;
    let sharedSecret: string;
    let identitySecret: string;

    try {
      const { shared_secret, identity_secret } = JSON.parse(maFile.buffer.toString());
      sharedSecret = shared_secret;
      identitySecret = identity_secret;
    } catch (err) {
      throw new InvalidMaFileException();
    }

    if (!sharedSecret || !identitySecret) {
      throw new InvalidMaFileException();
    }

    const bot = new SteamBot({ accountName, password, proxy });
    const [cookies, err] = await of(bot.login({ sharedSecret }));
    if (err) {
      if (err.message.includes('tunneling socket could not be established')) {
        throw new InvalidProxyException({ proxy });
      } else {
        throw new UncaughtSteamErrorException({ message: err.message });
      }
    }

    const tf2Items = await bot.getInventoryItems(cookies, Game.CSGO);
    if (!tf2Items || !tf2Items.length) {
      throw new BotDontHaveItemsException({ gameName: Game[Game.CSGO] });
    }

    const tradeOfferUrl = await bot.getTradeOfferUrl();
    const botInfo = await bot.getAccountInfo();
    const steamBot = new SteamBotEntity();
    steamBot.accountName = accountName;
    steamBot.password = password;
    steamBot.sharedSecret = sharedSecret;
    steamBot.identitySecret = identitySecret;
    steamBot.avatar = botInfo.avatar;
    steamBot.name = botInfo.name;
    steamBot.profileUrl = botInfo.profileUrl;
    steamBot.tradeOfferUrl = tradeOfferUrl;
    steamBot.isAdmin = isAdmin;
    steamBot.cookies = cookies;

    await this.steamBotRepository.save(steamBot);
  }

  public async getFreeBotWithQueryRunner(queryRunner: QueryRunner) {
    const steamBotRepository = queryRunner.manager.getRepository(SteamBotEntity);
    return await steamBotRepository.findOne({ isAdmin: false, isDeactivated: false, sell: null });
  }

  public async linkFreeBotToSell(sellId: number) {
    const result = await this.steamBotRepository
      .createQueryBuilder()
      .update(SteamBotEntity, { sell: { id: sellId } })
      .where('steam_bots.is_admin IS FALSE')
      .andWhere('steam_bots.is_deactivated IS FALSE')
      .andWhere('steam_bots."sellId" IS NULL')
      .returning('*')
      .execute();

    if (!result.raw.length) throw new NoFreeBotException();

    return result.raw.map(entity => {
      const steamBot = new SteamBotEntity();
      for (const prop in entity) {
        steamBot[camelCase(prop)] = entity[prop];
      }

      return steamBot;
    })[0];
  }

  public async sendTradeOffer(dto: SendTradeOfferDTO) {
    const { accountName, tradeOfferLink, theirItems, giveTF2Item } = dto;
    const botEntity = await this.steamBotRepository.findOne({ accountName });
    if (!botEntity) {
      throw new BotNotFoundException({ accountName });
    }

    try {
      const bot = new SteamBot();
      let myItems = [];
      let identitySecret: string;
      if (giveTF2Item) {
        const [tf2item] = await bot.getInventoryItems(botEntity.cookies, Game.CSGO);
        myItems.push(tf2item);
        myItems = myItems.filter(tf2item => tf2item);

        identitySecret = botEntity.identitySecret;
      }

      const options: SendTradeOfferOptions = {
        identitySecret,
        partner: tradeOfferLink,
        theirItems,
        myItems,
        cookies: botEntity.cookies,
      };

      return await bot.sendTradeOffer(options);
    } catch (err) {
      const causeToException = new Map();
      causeToException.set('TradeBan', YouAreTradeBannedException);
      causeToException.set('TargetCannotTrade', YouCannotTradeException);
      causeToException.set('ItemServerUnavailable', SteamItemServerUnavailableException);

      if (err.cause) {
        const Exception = causeToException.get(err.cause);
        if (Exception) throw new Exception();
      }

      const messageToException = new Map();
      messageToException.set(
        'There was an error sending your trade offer.  Please try again later. (26)',
        InvalidItemsInTradeException,
      );

      const Exception = messageToException.get(err.message);
      if (Exception) throw new Exception();

      throw new UncaughtSteamErrorException({ message: err.message });
    }
  }

  public async getTradeOffer(dto: GetTradeOfferDTO) {
    const { accountName, tradeId } = dto;
    const botEntity = await this.steamBotRepository.findOne({ accountName });
    if (!botEntity) {
      throw new BotNotFoundException({ accountName });
    }

    try {
      const bot = new SteamBot();
      return await bot.getTradeOffer({ tradeId, cookies: botEntity.cookies });
    } catch (err) {
      throw new UncaughtSteamErrorException({ message: err.message });
    }
  }

  public async cancelTradeOffer(dto: CancelTradeOfferDTO) {
    const { accountName, tradeId } = dto;
    const botEntity = await this.steamBotRepository.findOne({ accountName });
    if (!botEntity) {
      throw new BotNotFoundException({ accountName });
    }

    try {
      const bot = new SteamBot();
      await bot.cancelTradeOffer({ tradeId, cookies: botEntity.cookies });
    } catch (err) {
      throw new UncaughtSteamErrorException({ message: err.message });
    }
  }

  public async getInventory(dto: SteamBotDTO.GetInventory) {
    const { accountName, games } = dto;
    const botEntity = await this.steamBotRepository.findOne({ accountName });
    if (!botEntity) {
      throw new BotNotFoundException({ accountName });
    }

    try {
      const bot = new SteamBot();
      const inventory = [];
      for await (const game of games) {
        const items = await bot.getInventoryItems(botEntity.cookies, game);
        inventory.push(...items);
      }

      return inventory;
    } catch (err) {
      throw new UncaughtSteamErrorException({ message: err.message });
    }
  }

  public async deactivateBot(accountName: string) {
    await this.steamBotRepository.update(accountName, { isDeactivated: true });
  }

  public async freeBot(accountName: string) {
    await this.steamBotRepository.update(accountName, { sell: null });
  }

  public async refreshBotCookies(accountName: string) {
    const botEntity = await this.steamBotRepository.findOne({ accountName });
    if (!botEntity) throw new BotNotFoundException({ accountName });

    const bot = new SteamBot({ accountName, password: botEntity.password });
    const cookies = await bot.login({ sharedSecret: botEntity.sharedSecret });
    await this.steamBotRepository.update({ accountName }, { cookies });
  }

  public async checkTradeOfferLink(tradeOfferLink: string) {
    const [botEntity] = await this.steamBotRepository.find();

    try {
      const bot = new SteamBot({ accountName: botEntity.accountName, password: botEntity.password });
      await bot.checkTradeOfferLink(tradeOfferLink, botEntity.cookies);
    } catch (err) {
      if (err.message.includes('Not Logged In') || err.message.includes('Malformed response')) {
        await this.refreshBotCookies(botEntity.accountName);
        return await this.checkTradeOfferLink(tradeOfferLink);
      } else {
        throw err;
      }
    }
  }
}
