import { HttpService, Injectable } from '@nestjs/common';
import { sleep } from '../../common/functions/sleep';
import { GetSkinInfo, GetSkinsListOptions, SkinInfo, SkinsList } from './cs-money.interfaces';

@Injectable()
export class CsMoneyService {
  constructor(private httpService: HttpService) {}

  public async getSkinsList(options: GetSkinsListOptions) {
    const { appId, limit, offset, rarity } = options;
    const link = `https://inventories.cs.money/4.0/load_bots_inventory/${appId}`;
    const { data } = await this.httpService
      .get(link, {
        params: { hasTradeLock: false, isStore: true, limit, offset, sort: 'price', order: 'desc', rarity },
        responseType: 'json',
      })
      .toPromise();

    if (data?.error) {
      if (data.error === 2) {
        throw new Error('End of skins list.');
      } else {
        throw new Error(data.error);
      }
    }

    return (data as SkinsList).items;
  }

  public async getSkinInfo(options: GetSkinInfo): Promise<SkinInfo> {
    try {
      const { appId, id, proxy } = options;
      const link = `https://cs.money/skin_info`;
      const response = await this.httpService
        .get(link, {
          params: {
            appId,
            id,
            isBot: true,
            isStore: true,
            botInventory: true,
          },
          responseType: 'json',
          proxy,
        })
        .toPromise();
      return response.data;
    } catch (err) {
      await sleep(1000);
      return await this.getSkinInfo(options);
    }
  }
}
