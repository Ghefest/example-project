import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlacklistedItemDTO } from '@pot-back/common';
import { Repository } from 'typeorm';
import { PaginationQuery } from '../../common/classes/pagination-query';
import { BlacklistedItemEntity } from './blacklisted-item.entity';

@Injectable()
export class BlacklistedItemService {
  constructor(
    @InjectRepository(BlacklistedItemEntity) private blacklistedItemRepository: Repository<BlacklistedItemEntity>,
  ) {}

  public async getAll(pagination: PaginationQuery) {
    const { take, skip } = pagination;
    return await this.blacklistedItemRepository.find({ skip, take, order: { name: 'DESC' } });
  }

  public async getByName(dto: BlacklistedItemDTO.GetByName) {
    const { name } = dto;
    return await this.blacklistedItemRepository
      .createQueryBuilder('item')
      .where('item.name ILIKE :name', { name: `%${name}%` })
      .getMany();
  }

  public async create(dto: BlacklistedItemDTO.Create) {
    const { name } = dto;
    const blacklistedItem = new BlacklistedItemEntity();
    blacklistedItem.name = name;

    return await this.blacklistedItemRepository.save(blacklistedItem);
  }

  public async delete(dto: BlacklistedItemDTO.DeleteByName) {
    const { name } = dto;
    await this.blacklistedItemRepository.delete({ name });
  }
}
