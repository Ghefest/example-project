import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CsMoneyPricesDTO } from '@pot-back/common';
import { Queue } from 'bull';
import { BullAdapter, setQueues } from 'bull-board';
import { FindConditions, ILike, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { CS_MONEY_PRICES_QUEUE, UPDATE_PRICES_JOB } from './constants';
import { CsMoneyItemEntity } from './cs-money-item.entity';
import { CsMoneyUpdatePricesJob } from './cs-money-prices.interfaces';
import { ItemNotFoundException } from './exceptions/item-not-found.exception';

@Injectable()
export class CsMoneyPricesService {
  constructor(
    @InjectRepository(CsMoneyItemEntity) private csMoneyItemRepository: Repository<CsMoneyItemEntity>,
    @InjectQueue(CS_MONEY_PRICES_QUEUE) private csMoneyPricesQueue: Queue<CsMoneyUpdatePricesJob>,
  ) {
    setQueues([new BullAdapter(this.csMoneyPricesQueue)]);
  }

  public async addJob(job: CsMoneyUpdatePricesJob) {
    return await this.csMoneyPricesQueue.add(UPDATE_PRICES_JOB, job);
  }

  public async getActiveJobs() {
    return await this.csMoneyPricesQueue.getActive();
  }

  public async search(dto: CsMoneyPricesDTO.SearchQuery) {
    const { name, price, compare, limit } = dto;

    const where: FindConditions<CsMoneyItemEntity> = {};
    if (name) where.name = ILike(`%${name}%`);
    if (price && compare) {
      const operator = compare === 'lower' ? LessThanOrEqual : MoreThanOrEqual;
      where.price = operator(price);
    }

    return await this.csMoneyItemRepository.find({
      where,
      take: limit,
      order: {
        price: 'DESC',
      },
    });
  }

  public async updatePriceByName(name: string, dto: CsMoneyPricesDTO.UpdatePrice) {
    const { price } = dto;
    const item = await this.csMoneyItemRepository.findOne({ name });
    if (!item) {
      throw new ItemNotFoundException();
    }

    return await this.csMoneyItemRepository.save({ name, price });
  }

  public async save(items: CsMoneyItemEntity[]) {
    return await this.csMoneyItemRepository.save(items);
  }

  public async getByName(name: string) {
    return await this.csMoneyItemRepository.findOne({ name });
  }
}
