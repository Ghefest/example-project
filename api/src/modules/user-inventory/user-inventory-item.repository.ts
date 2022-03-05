import { EntityRepository, Repository } from 'typeorm';
import { CsMoneyItemEntity } from '../cs-money-prices/cs-money-item.entity';
import { UserInventoryItemEntity } from './user-inventory-item.entity';

@EntityRepository(UserInventoryItemEntity)
export class UserInventoryItemRepository extends Repository<UserInventoryItemEntity> {
  async findManyByUserIdWithPriceAndIsBlacklisted(options: {
    userId: number;
    games?: number[];
    sort?: 'name' | 'price';
    order?: 'ASC' | 'DESC';
    name?: string;
    types?: string;
    rarities?: string;
    take?: number;
    skip?: number;
  }): Promise<
    Array<
      UserInventoryItemEntity & {
        price: number;
        gems: any[];
        stickers: any[];
        isBlacklisted: boolean;
        rubPrice: number;
      }
    >
  > {
    const { userId, games, sort, order, name, types, rarities, take, skip } = options;

    const query = this.createQueryBuilder('i')
      .select('i.id', 'id')
      .addSelect('i.game', 'game')
      .addSelect('i.name', 'name')
      .addSelect('i.image', 'image')
      .addSelect('i.rarity', 'rarity')
      .addSelect('i.type', 'type')
      .addSelect('i.stickers', 'stickers')
      .addSelect('i.gems', 'gems')
      .addSelect(
        'COALESCE(CAST(ROUND(c.price - ((c.price * (COALESCE( (SELECT x FROM items_names_xs where name = i.name), (SELECT x FROM items_types_xs where type = i.type), (SELECT price_formula_x FROM admin_settings) )) - u.discount) / 100), 2) AS REAL), 0)',
        'price',
      )
      .addSelect(
        `CAST(ROUND(COALESCE(CAST(ROUND(c.price - ((c.price * (COALESCE( (SELECT x FROM items_names_xs where name = i.name), (SELECT x FROM items_types_xs where type = i.type), (SELECT price_formula_x FROM admin_settings) )) - u.discount) / 100), 2) AS NUMERIC), 0) * CAST((SELECT rate from currency_rates where base = 'USD') AS NUMERIC), 2) AS REAL)`,
        'rubPrice',
      )
      .addSelect(
        `
        CASE
          WHEN COALESCE(CAST(ROUND(c.price - ((c.price * (COALESCE( (SELECT x FROM items_names_xs where name = i.name), (SELECT x FROM items_types_xs where type = i.type), (SELECT price_formula_x FROM admin_settings) )) - u.discount) / 100), 2) AS REAL), 0) >= (SELECT item_buy_max_price FROM admin_settings) THEN TRUE
          WHEN COALESCE(CAST(ROUND(c.price - ((c.price * (COALESCE( (SELECT x FROM items_names_xs where name = i.name), (SELECT x FROM items_types_xs where type = i.type), (SELECT price_formula_x FROM admin_settings) )) - u.discount) / 100), 2) AS REAL), 0) <= (SELECT item_buy_min_price FROM admin_settings) THEN TRUE
          WHEN (SELECT name FROM blacklisted_items where name = i.name) != '' THEN TRUE
          WHEN (SELECT type FROM blacklisted_item_types where type = i.type) != '' THEN TRUE
          ELSE FALSE
        END
      `,
        'isBlacklisted',
      )
      .innerJoin('users', 'u', 'i.userId = u.id')
      .leftJoin(CsMoneyItemEntity, 'c', 'i.name = c.name')
      .where('i.userId = :userId', { userId });

    if (games) query.andWhere('i.game IN (:...games)', { games });
    if (sort) query.orderBy(sort, order, 'NULLS LAST').addOrderBy('i.id', 'DESC');
    if (name) query.andWhere(`i.name ILIKE :name`, { name: `%${name}%` });
    if (types) query.andWhere(`i.type IN (:...types)`, { types });
    if (rarities) query.andWhere(`i.rarity IN (:...rarities)`, { rarities });
    if (take) query.limit(take);
    if (skip) query.offset(skip);

    return await query.getRawMany();
  }

  async findUserItemByIdWithPriceAndIsBlacklisted(options: {
    id: number;
    userId: number;
  }): Promise<
    UserInventoryItemEntity & { price: number; gems: any[]; stickers: any[]; isBlacklisted: boolean; rubPrice: number }
  > {
    const { id, userId } = options;

    const [item] = await this.manager.query(
      `
      SELECT
      u.id,
      u.asset_id as "assetId",
      u.game,
      u.name,
      u.border_color as "borderColor",
      u.image,
      u.rarity,
      u.type,
      u.stickers,
      u.gems,
      COALESCE(CAST(ROUND(c.price - ((c.price * (COALESCE( (SELECT x FROM items_names_xs where name = u.name), (SELECT x FROM items_types_xs where type = u.type), (SELECT price_formula_x FROM admin_settings) )) - users.discount) / 100), 2) AS REAL), 0) AS "price",
      CAST(ROUND(COALESCE(CAST(ROUND(c.price - ((c.price * (COALESCE( (SELECT x FROM items_names_xs where name = u.name), (SELECT x FROM items_types_xs where type = u.type), (SELECT price_formula_x FROM admin_settings) )) - users.discount) / 100), 2) AS NUMERIC), 0) * CAST((SELECT rate from currency_rates where base = 'USD') AS NUMERIC), 2) AS REAL) as "rubPrice",
      CASE
          WHEN COALESCE(CAST(ROUND(c.price - ((c.price * (COALESCE( (SELECT x FROM items_names_xs where name = u.name), (SELECT x FROM items_types_xs where type = u.type), (SELECT price_formula_x FROM admin_settings) )) - users.discount) / 100), 2) AS REAL), 0) >= (SELECT item_buy_max_price FROM admin_settings) THEN TRUE
          WHEN COALESCE(CAST(ROUND(c.price - ((c.price * (COALESCE( (SELECT x FROM items_names_xs where name = u.name), (SELECT x FROM items_types_xs where type = u.type), (SELECT price_formula_x FROM admin_settings) )) - users.discount) / 100), 2) AS REAL), 0) <= (SELECT item_buy_min_price FROM admin_settings) THEN TRUE
          WHEN (SELECT name FROM blacklisted_items where name = u.name) != '' THEN TRUE
          WHEN (SELECT type FROM blacklisted_item_types where type = u.type) != '' THEN TRUE
          ELSE FALSE
      END AS "isBlacklisted"
      FROM user_inventory_items AS u
      INNER JOIN users ON u."userId" = users.id
      LEFT JOIN cs_money_items AS c ON u.name = c.name
      WHERE u.id = $2 AND u."userId" = $1
      LIMIT 1
    `,
      [userId, id],
    );

    return item;
  }

  public async findUserInventoryPrice(options: { userId: number }) {
    const { userId } = options;

    const [result] = await this.manager.query(
      `
      SELECT u."userId",
      SUM(COALESCE(CAST(ROUND(c.price - ((c.price * (COALESCE( (SELECT x FROM items_names_xs where name = u.name), (SELECT x FROM items_types_xs where type = u.type), (SELECT price_formula_x FROM admin_settings) )) - users.discount) / 100), 2) AS REAL), 0)) AS "price"
      FROM public.user_inventory_items as u
      INNER JOIN users ON u."userId" = users.id
      LEFT JOIN cs_money_items AS c ON u.name = c.name
      WHERE u."userId" = $1
      AND
	      (CASE
     	    WHEN COALESCE(CAST(ROUND(c.price - ((c.price * (COALESCE( (SELECT x FROM items_names_xs where name = u.name), (SELECT x FROM items_types_xs where type = u.type), (SELECT price_formula_x FROM admin_settings) )) - users.discount) / 100), 2) AS REAL), 0) >= (SELECT item_buy_max_price FROM admin_settings) THEN TRUE
          WHEN COALESCE(CAST(ROUND(c.price - ((c.price * (COALESCE( (SELECT x FROM items_names_xs where name = u.name), (SELECT x FROM items_types_xs where type = u.type), (SELECT price_formula_x FROM admin_settings) )) - users.discount) / 100), 2) AS REAL), 0) <= (SELECT item_buy_min_price FROM admin_settings) THEN TRUE
          WHEN (SELECT name FROM blacklisted_items where name = u.name) != '' THEN TRUE
          WHEN (SELECT type FROM blacklisted_item_types where type = u.type) != '' THEN TRUE
          ELSE FALSE
		    END) = FALSE
      GROUP BY u."userId"
      LIMIT 1
    `,
      [userId],
    );

    return result?.price ?? 0;
  }
}
