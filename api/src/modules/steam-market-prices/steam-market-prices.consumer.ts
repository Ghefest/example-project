import { Process, Processor } from '@nestjs/bull';
import { HttpService } from '@nestjs/common';
import { Job } from 'bull';
import { sleep } from '../../common/functions/sleep';
import { STEAM_MARKET_PRICES_QUEUE, UPDATE_PRICES_JOB } from './constants';
import { SteamMarketItemEntity } from './steam-market-item.entity';
import { SteamMarketUpdatePricesJob } from './steam-market-prices.interfaces';
import { SteamMarketPricesService } from './steam-market-prices.service';

@Processor(STEAM_MARKET_PRICES_QUEUE)
export class SteamMarketPricesConsumer {
  private NOT_SUCCESS_PAUSE_IN_MS = 4 * 1000;
  private PAUSE_AFTER_FETCH_IN_MS = 1 * 1000;
  private PAUSE_ON_TOO_MANY_REQUESTS_IN_MS = 8 * 1000;
  private PAGE_SIZE = 100;

  constructor(private steamMarketPricesService: SteamMarketPricesService, private httpService: HttpService) {}

  @Process(UPDATE_PRICES_JOB)
  async updatePrices(job: Job<SteamMarketUpdatePricesJob>) {
    const { data } = job;
    const previousProgress = job.progress();
    let current = 0;
    let end = Number.MAX_VALUE;

    if (previousProgress > 0) {
      await job.log('Starting job from: ' + previousProgress + '%.');
      current = await this.getPreviousCurrent(previousProgress, data.game);
    }

    while (current < end) {
      try {
        const link = this.makeRequestLink(data.game, current);
        const body = await this.makeRequest(link);

        if (!body.success || body.total_count === 0) {
          await job.log('Failure.');
          await sleep(this.NOT_SUCCESS_PAUSE_IN_MS);
          continue;
        }

        current += this.PAGE_SIZE;
        end = body.total_count;
        await job.log(`Fetched. ${current}:${end}.`);

        const { results } = body;
        const items = results.map(result => {
          const entity = new SteamMarketItemEntity();
          entity.name = result.asset_description.market_hash_name;
          entity.price = +(result.sell_price / 100).toFixed(2);
          entity.gameId = result.asset_description.appid;

          return entity;
        });

        await this.steamMarketPricesService.save(items);

        const progress = +((current * 100) / end).toFixed(2);
        await job.progress(progress);

        await sleep(this.PAUSE_AFTER_FETCH_IN_MS);
      } catch (err) {
        await job.log('Pause. Too many requests.');
        await sleep(this.PAUSE_ON_TOO_MANY_REQUESTS_IN_MS);
      }
    }

    await job.log('Prices updated.');
  }

  private async getPreviousCurrent(previousProgress: number, appId: number) {
    let previousCurrent = 0;
    let gotResult = false;

    while (!gotResult) {
      const link = this.makeRequestLink(appId, 0);
      const body = await this.makeRequest(link);
      if (!body.success || body.total_count === 0) {
        await sleep(this.NOT_SUCCESS_PAUSE_IN_MS);
      }

      const end = body.total_count;
      previousCurrent = +(end * (previousProgress / 100)).toFixed(2);
      gotResult = true;
    }

    return previousCurrent;
  }

  private makeRequestLink(gameId: number, startPos: number) {
    const baseLink = 'https://steamcommunity.com/market/search/render/';
    const searchDescription = '?search_descriptions=0';
    const sortColumn = '&sort_column=name';
    const sortDir = '&sort_dir=asc';
    const appId = `&appid=` + gameId;
    const noRender = '&norender=1';
    const count = '&count=500';
    const start = '&start=' + startPos;

    return baseLink + searchDescription + sortColumn + sortDir + appId + noRender + count + start;
  }

  private async makeRequest(link: string) {
    const response = await this.httpService.get(link, { responseType: 'json' }).toPromise();
    return response.data as any;
  }
}
