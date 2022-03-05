import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game, UserInventoryDTO } from '@pot-back/common';
import { In, Repository } from 'typeorm';
import { CEconItemMapper } from '../../common/classes/c-econ-item.mapper';
import { UserEntity } from '../user/user.entity';
import { UserInventoryCsGoItemEntity } from './user-inventory-csgo-item.entity';
import { UserInventoryDota2ItemEntity } from './user-inventory-dota2-item.entity';
import { UserInventoryItemEntity } from './user-inventory-item.entity';
import { UserInventoryItemRepository } from './user-inventory-item.repository';
const SteamCommunity = require('steamcommunity');

@Injectable()
export class UserInventoryService {
  private steamCommunity = new SteamCommunity();
  constructor(
    private userInventoryItemRepository: UserInventoryItemRepository,
    @InjectRepository(UserInventoryCsGoItemEntity)
    private userInventoryCsGoItemRepository: Repository<UserInventoryCsGoItemEntity>,
    @InjectRepository(UserInventoryDota2ItemEntity)
    private userInventoryDota2ItemEntity: Repository<UserInventoryDota2ItemEntity>,
  ) {}

  public async getInventory(
    dto: UserInventoryDTO.GetInventoryQuery,
    user: UserEntity,
  ): Promise<{ items: UserInventoryItemEntity[]; total: number }> {
    const { games } = dto;

    const items = await this.userInventoryItemRepository.findManyByUserIdWithPriceAndIsBlacklisted({
      userId: user.id,
      ...dto,
    });
    const total = await this.userInventoryItemRepository.count({
      relations: ['user'],
      where: {
        user: { id: user.id },
        game: In(games),
      },
    });

    return { items, total: total ?? 0 };
  }

  public async getUserItemById(userId: number, id: number) {
    return await this.userInventoryItemRepository.findUserItemByIdWithPriceAndIsBlacklisted({ userId, id });
  }

  public async clearInventory(games: Game[], user: UserEntity) {
    await this.userInventoryItemRepository.delete({ game: In(games), user });
  }

  public async loadInventoryFromSteam(games: Game[], user: UserEntity) {
    const loadPromises = [];
    for (const game of games) {
      const loadPromise = new Promise<void>(async (resolve, reject) => {
        this.steamCommunity.getUserInventoryContents(user.steamId64, game, 2, true, async (err, inventory) => {
          if (err) {
            reject(err);
          } else {
            try {
              for await (const inventoryItem of inventory) {
                const itemInfo = CEconItemMapper.mapToItemInfo(inventoryItem);

                if (game === Game.CSGO) {
                  const csGoItem = new UserInventoryCsGoItemEntity();
                  csGoItem.assetId = itemInfo.assetId;
                  csGoItem.classId = itemInfo.classId;
                  csGoItem.instanceId = itemInfo.instanceId;
                  csGoItem.name = itemInfo.name;
                  csGoItem.nameColor = itemInfo.nameColor;
                  csGoItem.image = itemInfo.image;
                  csGoItem.borderColor = itemInfo.borderColor;
                  csGoItem.rarity = itemInfo.rarity;
                  csGoItem.exterior = itemInfo.exterior;
                  csGoItem.type = itemInfo.type;
                  csGoItem.user = user;
                  if (itemInfo.stickers.length) {
                    csGoItem.stickers = itemInfo.stickers;
                  }

                  await this.userInventoryCsGoItemRepository
                    .createQueryBuilder()
                    .insert()
                    .values(csGoItem)
                    .onConflict('ON CONSTRAINT asset_id_game_index DO NOTHING')
                    .execute();
                } else if (game === Game.DOTA2) {
                  const dota2Item = new UserInventoryDota2ItemEntity();
                  dota2Item.assetId = itemInfo.assetId;
                  dota2Item.classId = itemInfo.classId;
                  dota2Item.instanceId = itemInfo.instanceId;
                  dota2Item.name = itemInfo.name;
                  dota2Item.nameColor = itemInfo.nameColor;
                  dota2Item.image = itemInfo.image;
                  dota2Item.borderColor = itemInfo.borderColor;
                  dota2Item.rarity = itemInfo.rarity;
                  dota2Item.quality = itemInfo.quality;
                  dota2Item.type = itemInfo.type;
                  dota2Item.user = user;
                  if (itemInfo.gems.length) {
                    dota2Item.gems = itemInfo.gems;
                  }

                  await this.userInventoryDota2ItemEntity
                    .createQueryBuilder()
                    .insert()
                    .values(dota2Item)
                    .onConflict('ON CONSTRAINT asset_id_game_index DO NOTHING')
                    .execute();
                }
              }
              resolve();
            } catch (err) {
              reject(err);
            }
          }
        });
      });

      loadPromises.push(loadPromise);
    }

    await Promise.allSettled(loadPromises);
  }

  public async getUserInventoryPrice(userId: number) {
    return await this.userInventoryItemRepository.findUserInventoryPrice({ userId });
  }

  public async deleteItemsByAssetIds(assetIds: string[]) {
    await this.userInventoryItemRepository.delete({ assetId: In(assetIds) });
  }
}
