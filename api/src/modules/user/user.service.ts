import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from '@pot-back/common';
import { Repository } from 'typeorm';
import { OAuthDTO } from './dtos/o-auth.dto';
import { ReferrerNotFoundException } from './exceptions/referrer-not-found.exception';
import { ReferralCodeMustBeUniqueException } from './exceptions/referral-code-must-be-unique.exception';
import { UserEntity } from './user.entity';
import { YouAreAlreadyReferralException } from './exceptions/you-are-already-referral.exception';
import { GeoIpService } from '../geo-ip/geo-ip.service';
import * as TradeOfferManager from 'steam-tradeoffer-manager';
import { InvalidTradeOfferLinkException } from './exceptions/invalid-trade-offer-link.exception';
import { SteamBotService } from '../steam-bot/steam-bot.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    private geoIpService: GeoIpService,
    private steamBotService: SteamBotService,
    private logger: Logger,
  ) {}

  public async getMany(dto: UserDTO.GetMany) {
    const { username, steamId64, countryCode, sort, order, take, skip } = dto;

    const query = this.userRepository
      .createQueryBuilder('u')
      .addSelect('u.is_online', 'u_isOnline')
      .addSelect('u.profit_from_referrals', 'u_profitFromReferrals')
      .addSelect(
        `(SELECT
          SUM(COALESCE(CAST(ROUND(c.price - ((c.price * (COALESCE( (SELECT x FROM items_names_xs where name = i.name), (SELECT x FROM items_types_xs where type = i.type), (SELECT price_formula_x FROM admin_settings) )) - users.discount) / 100), 2) AS REAL), 0)) AS "price"
          FROM public.user_inventory_items as i
          INNER JOIN users ON i."userId" = users.id
          LEFT JOIN cs_money_items AS c ON i.name = c.name
          WHERE i."userId" = u.id
          AND
          (CASE
            WHEN COALESCE(CAST(ROUND(c.price - ((c.price * (COALESCE( (SELECT x FROM items_names_xs where name = i.name), (SELECT x FROM items_types_xs where type = i.type), (SELECT price_formula_x FROM admin_settings) )) - users.discount) / 100), 2) AS REAL), 0) >= (SELECT item_buy_max_price FROM admin_settings) THEN TRUE
            WHEN COALESCE(CAST(ROUND(c.price - ((c.price * (COALESCE( (SELECT x FROM items_names_xs where name = i.name), (SELECT x FROM items_types_xs where type = i.type), (SELECT price_formula_x FROM admin_settings) )) - users.discount) / 100), 2) AS REAL), 0) <= (SELECT item_buy_min_price FROM admin_settings) THEN TRUE
            WHEN (SELECT name FROM blacklisted_items where name = i.name) != '' THEN TRUE
            WHEN (SELECT type FROM blacklisted_item_types where type = i.type) != '' THEN TRUE
            ELSE FALSE
          END) = FALSE
          GROUP BY i."userId"
          LIMIT 1)`,
        'u_inventoryPrice',
      )
      .addSelect(
        `COALESCE((
        SELECT SUM(s.total_items_price) AS "totalSumOfSales"
        FROM sells AS s
        WHERE s."userId" = u.id
        AND s.status = '10'
        GROUP BY s."userId"
        ), 0)`,
        'u_salesSum',
      )
      .addSelect(
        `
        (SELECT CAST(COUNT(id) AS REAL) AS count from "users" where "referrerId" = u.id)
      `,
        'u_numberOfReferrals',
      )
      .orderBy('u.created_at', 'DESC')
      .take(take)
      .skip(skip);

    if (username) query.where('u.username ILIKE :username', { username: `%${username}%` });
    if (steamId64) query.where('u.steam_id64 = :steamId64', { steamId64 });
    if (countryCode) query.where('u.country_code = :countryCode', { countryCode });

    if (sort && order) {
      let sortBy: string = sort;
      if (sort !== 'balance') {
        sortBy = `"u_${sort}"`;
      }

      query.orderBy(sortBy, order, 'NULLS LAST');
    }

    return query.getManyAndCount();
  }

  public async getReferrals(id: number) {
    return await this.userRepository.find({ referrerId: id });
  }

  public async getById(id: number) {
    return await this.userRepository.findOne({ id });
  }

  public async getOrCreateOAuth(dto: OAuthDTO) {
    const { username, avatar, steamId64, ip, device, referralCode } = dto;
    let user = await this.userRepository.findOne({ steamId64 });
    if (!user) {
      user = new UserEntity();
      user.username = username;
      user.avatar = avatar;
      user.steamId64 = steamId64;
      user.ip = ip;
      user.device = device;
      user.countryCode = await this.geoIpService
        .country(ip)
        .then(country => country.country?.isoCode)
        .catch<null>(() => null);

      if (referralCode) {
        const referralCodeOwner = await this.userRepository.findOne({ referralCode });
        if (referralCodeOwner) {
          user.referrerId = referralCodeOwner.id;
        }
      }
    }

    return await this.userRepository.save(user);
  }

  public async updateSteamId64(userId: number, steamId64: string) {
    await this.userRepository.update({ id: userId }, { steamId64 });
  }

  public async updateTradeOfferLink(user: UserEntity, dto: UserDTO.UpdateTradeOfferLinkDTO) {
    const { tradeOfferLink } = dto;

    try {
      await this.steamBotService.checkTradeOfferLink(tradeOfferLink);
    } catch (err) {
      if (!(err.message as string).includes('This Trade URL is no longer valid for sending a trade offer')) {
        this.logger.warn(err.message, 'UserService.updateTradeOfferLink');
      }

      throw new InvalidTradeOfferLinkException();
    }

    await this.userRepository.update({ id: user.id }, { tradeOfferLink });
  }

  public async updateEmail(user: UserEntity, dto: UserDTO.UpdateEmailDTO) {
    const { email } = dto;
    await this.userRepository.update({ id: user.id }, { email });
  }

  public async updateTelegramTag(user: UserEntity, dto: UserDTO.UpdateTelegramTagDTO) {
    const { telegramTag } = dto;
    await this.userRepository.update({ id: user.id }, { telegramTag });
  }

  public async updateUsername(user: UserEntity, dto: UserDTO.UpdateUsernameDTO) {
    const { username } = dto;
    await this.userRepository.update({ id: user.id }, { username });
  }

  public async updateDiscount(userId: number, discount: number) {
    await this.userRepository.update(userId, { discount });
  }

  public async updateReferralCode(user: UserEntity, dto: UserDTO.UpdateReferralCodeDTO) {
    const { referralCode } = dto;
    const isInUse = await this.userRepository.findOne({ referralCode });
    if (isInUse) {
      throw new ReferralCodeMustBeUniqueException();
    }

    await this.userRepository.update({ id: user.id }, { referralCode });
  }

  public async updateReferrer(user: UserEntity, dto: UserDTO.UpdateReferrerDTO) {
    if (user.referrerId) {
      throw new YouAreAlreadyReferralException();
    }

    const { referralCode } = dto;
    const referralCodeOwner = await this.userRepository.findOne({ referralCode });
    if (!referralCodeOwner) {
      throw new ReferrerNotFoundException();
    }

    await this.userRepository.update({ id: user.id }, { referrer: referralCodeOwner });
  }

  public async increaseBalance(id: number, balance: number) {
    await this.userRepository.update({ id }, { balance: () => `balance + ${balance}` });
  }

  public async updateIsOnline(id: number, isOnline: boolean) {
    await this.userRepository.update({ id }, { isOnline });
  }

  public async updateLastVisitedAt(id: number, lastVisitedAt: Date) {
    await this.userRepository.update({ id }, { lastVisitedAt });
  }

  public async updateIsBalanceBanned(id: number, isBalanceBanned: boolean) {
    await this.userRepository.update({ id }, { isBalanceBanned });
  }

  public async updateBalance(id: number, balance: number) {
    await this.userRepository.update({ id }, { balance });
  }

  public async increaseProfitFromReferrals(id: number, profit: number) {
    await this.userRepository.update({ id }, { profitFromReferrals: () => `profit_from_referrals + ${profit}` });
  }

  public async updatePercentFromReferralSales(id: number, percent: number) {
    await this.userRepository.update({ id }, { percentFromReferralSales: percent });
  }

  public async increaseProfitForReferrer(id: number, profit: number) {
    await this.userRepository.update({ id }, { profitForReferrer: () => `profit_for_referrer + ${profit}` });
  }

  public async updatePayoutOptions(id: number, dto: UserDTO.UpdatePayoutOptions) {
    const { provider, email, purse } = dto;
    await this.userRepository.update(id, {
      savedPayoutProvider: provider,
      savedPayoutEmail: email,
      savedPayoutPurse: purse,
    });
  }
}
