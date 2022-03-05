import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlacklistedItemTypesDTO } from '@pot-back/common';
import { Repository } from 'typeorm';
import { BlacklistedItemTypeEntity } from './blacklisted-item-type.entity';

@Injectable()
export class BlacklistedItemTypeService {
  constructor(
    @InjectRepository(BlacklistedItemTypeEntity)
    private blacklistedItemTypeRepository: Repository<BlacklistedItemTypeEntity>,
  ) {}

  public async getAll() {
    return await this.blacklistedItemTypeRepository.find();
  }

  public async getByType(dto: BlacklistedItemTypesDTO.GetByType) {
    const { type } = dto;
    return await this.blacklistedItemTypeRepository
      .createQueryBuilder('item')
      .where('item.type ILIKE :type', { type: `%${type}%` })
      .getMany();
  }

  public async create(dto: BlacklistedItemTypesDTO.Create) {
    const { type } = dto;
    const blacklistedItemType = new BlacklistedItemTypeEntity();
    blacklistedItemType.type = type;

    return await this.blacklistedItemTypeRepository.save(blacklistedItemType);
  }

  public async delete(dto: BlacklistedItemTypesDTO.DeleteByType) {
    const { type } = dto;
    await this.blacklistedItemTypeRepository.delete({ type });
  }
}
