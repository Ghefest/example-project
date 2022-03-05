import { CsMoneyPricesService } from './cs-money-prices.sevice';
import { CS_MONEY_PRICES_QUEUE, UPDATE_PRICES_JOB } from './constants';
import { CsMoneyUpdatePricesJob } from './cs-money-prices.interfaces';
import { CsMoneyItemEntity } from './cs-money-item.entity';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { of } from 'await-of';
import { CsMoneyService } from '../cs-money/cs-money.service';

@Processor(CS_MONEY_PRICES_QUEUE)
export class CsMoneyPricesConsumer {
  constructor(private csMoneyService: CsMoneyService, private csMoneyPricesService: CsMoneyPricesService) {}

  @Process(UPDATE_PRICES_JOB)
  public async updatePrices(job: Job<CsMoneyUpdatePricesJob>) {
    const {
      game,
      payload: { rarity, proxy, offsetStart, offsetEnd },
    } = job.data;

    const skinsCache: Set<number> = new Set();
    const limit = 60; //todo move to constants
    const previousProgress = await job.progress();
    let offset = previousProgress || offsetStart || 0;
    let updatedItemsCount = 0;

    let error;

    while (true) {
      if (error === 'End of skins list.') break;
      if (offsetEnd && offset >= offsetEnd) break;

      const [skinsList, err] = await of(this.csMoneyService.getSkinsList({ appId: game, limit, offset, rarity }));
      if (err) {
        if (err.message === 'End of skins list.') {
          error = err.message;
          continue;
        } else {
          job.log(err.message);
          continue;
        }
      }

      for await (const skin of skinsList) {
        if (skinsCache.has(skin.nameId)) continue;

        const skinInfo = await this.csMoneyService.getSkinInfo({ appId: game, id: skin.id, proxy });
        if (!skinInfo.fullName) {
          continue;
        }

        const csMoneyItem = new CsMoneyItemEntity();
        csMoneyItem.name = skinInfo.fullName;
        csMoneyItem.gameId = game;
        csMoneyItem.price = skinInfo.defaultPrice;
        csMoneyItem.updatedAt = new Date();
        await this.csMoneyPricesService.save([csMoneyItem]);

        await job.log(`Added ${csMoneyItem.name}.`);
        updatedItemsCount++;

        skinsCache.add(skin.nameId);
      }

      offset += limit;
      await job.progress(offset);
    }

    await job.log(`Updated ${updatedItemsCount}`);
  }
}
