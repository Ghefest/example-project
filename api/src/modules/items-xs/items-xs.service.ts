import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemsXsDTO } from '@pot-back/common';
import { Repository } from 'typeorm';
import { ItemNameXEntity } from './item-name-x.entity';
import { ItemTypeXEntity } from './item-type-x.entity';

@Injectable()
export class ItemsXsService {
  constructor(
    @InjectRepository(ItemNameXEntity) private itemNameXRepository: Repository<ItemNameXEntity>,
    @InjectRepository(ItemTypeXEntity) private itemTypeXRepository: Repository<ItemTypeXEntity>,
  ) {}

  public async getItemsNamesXs() {
    return await this.itemNameXRepository.find();
  }

  public async getItemsNamesXsByName(name: string) {
    return await this.itemNameXRepository
      .createQueryBuilder('item')
      .where('item.name ILIKE :name', { name: `%${name}%` })
      .getMany();
  }

  public async createItemNameX(dto: ItemsXsDTO.CreateItemNameX) {
    const { name, x } = dto;
    const itemNameX = new ItemNameXEntity();
    itemNameX.name = name;
    itemNameX.x = x;

    await this.itemNameXRepository.save(itemNameX);
  }

  public async updateItemNameXByName(name: string, dto: ItemsXsDTO.UpdateItemNameXByName) {
    const { x } = dto;
    await this.itemNameXRepository.update({ name }, { x });
  }

  public async deleteItemNameX(name: string) {
    await this.itemNameXRepository.delete({ name });
  }

  public async getItemsTypesXs() {
    return await this.itemTypeXRepository.find();
  }

  public async getItemsTypesXsByType(type: string) {
    return await this.itemTypeXRepository
      .createQueryBuilder('item')
      .where('item.type ILIKE :type', { type: `%${type}%` })
      .getMany();
  }

  public async createItemTypeX(dto: ItemsXsDTO.CreateItemTypeX) {
    const { type, x } = dto;
    const itemTypeX = new ItemTypeXEntity();
    itemTypeX.type = type;
    itemTypeX.x = x;

    await this.itemTypeXRepository.save(itemTypeX);
  }

  public async updateItemTypeXByType(type: string, dto: ItemsXsDTO.UpdateItemTypeXByType) {
    const { x } = dto;
    await this.itemTypeXRepository.update({ type }, { x });
  }

  public async deleteItemTypeX(type: string) {
    await this.itemTypeXRepository.delete({ type });
  }
}
