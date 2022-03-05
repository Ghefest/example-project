import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SteamMarketPricesDTO } from '@pot-back/common';
import { Queue } from 'bull';
import { BullAdapter, setQueues } from 'bull-board';
import { FindConditions, ILike, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { STEAM_MARKET_PRICES_QUEUE, UPDATE_PRICES_JOB } from './constants';
import { ItemNotFoundException } from './exceptions/item-not-found.exception';
import { SteamMarketItemEntity } from './steam-market-item.entity';
import { SteamMarketUpdatePricesJob } from './steam-market-prices.interfaces';

@Injectable()
export class SteamMarketPricesService {
  constructor(
    @InjectRepository(SteamMarketItemEntity) private steamMarketItemRepository: Repository<SteamMarketItemEntity>,
    @InjectQueue(STEAM_MARKET_PRICES_QUEUE) private steamMarketPricesQueue: Queue<SteamMarketUpdatePricesJob>,
  ) {
    setQueues([new BullAdapter(this.steamMarketPricesQueue)]);
  }

  public async getActiveJobs() {
    return await this.steamMarketPricesQueue.getActive();
  }

  public async addJob(job: SteamMarketUpdatePricesJob) {
    return await this.steamMarketPricesQueue.add(UPDATE_PRICES_JOB, job);
  }

  public async save(items: SteamMarketItemEntity[]) {
    return await this.steamMarketItemRepository.save(items);
  }

  public async updatePriceByName(name: string, dto: SteamMarketPricesDTO.UpdatePrice) {
    const { price } = dto;
    const item = await this.steamMarketItemRepository.findOne({ name });
    if (!item) {
      throw new ItemNotFoundException();
    }

    return await this.steamMarketItemRepository.save({ name, price });
  }

  public async search(dto: SteamMarketPricesDTO.SearchQuery) {
    const { name, price, compare, limit } = dto;

    const where: FindConditions<SteamMarketItemEntity> = {};
    if (name) where.name = ILike(`%${name}%`);
    if (price && compare) {
      const operator = compare === 'lower' ? LessThanOrEqual : MoreThanOrEqual;
      where.price = operator(price);
    }

    return await this.steamMarketItemRepository.find({
      where,
      take: limit,
      order: {
        price: 'DESC',
      },
    });
  }
}
