import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminSettingsDTO } from '@pot-back/common';
import { Repository } from 'typeorm';
import { AdminSettingsEntity } from './admin-settings.entity';

@Injectable()
export class AdminSettingsService implements OnModuleInit {
  constructor(
    @InjectRepository(AdminSettingsEntity) private adminSettingsRepository: Repository<AdminSettingsEntity>,
  ) {}

  public async onModuleInit() {
    const [adminSettings] = await this.adminSettingsRepository.find();
    if (!adminSettings) {
      await this.adminSettingsRepository.save(new AdminSettingsEntity());
    }
  }

  public async get() {
    const [adminSettings] = await this.adminSettingsRepository.find();
    return adminSettings;
  }

  public async updatePriceFormulaX(dto: AdminSettingsDTO.UpdatePriceFormulaX) {
    const { priceFormulaX } = dto;
    const [adminSettings] = await this.adminSettingsRepository.find();
    await this.adminSettingsRepository.update({ id: adminSettings.id }, { priceFormulaX });
  }

  public async updateItemBuyMinPrice(dto: AdminSettingsDTO.UpdateItemBuyMinPrice) {
    const { itemBuyMinPrice } = dto;
    const [adminSettings] = await this.adminSettingsRepository.find();
    await this.adminSettingsRepository.update({ id: adminSettings.id }, { itemBuyMinPrice });
  }

  public async updateItemBuyMaxPrice(dto: AdminSettingsDTO.UpdateItemBuyMaxPrice) {
    const { itemBuyMaxPrice } = dto;
    const [adminSettings] = await this.adminSettingsRepository.find();
    await this.adminSettingsRepository.update({ id: adminSettings.id }, { itemBuyMaxPrice });
  }

  public async updateIsSalesEnabled(dto: AdminSettingsDTO.UpdateIsSalesEnabled) {
    const { isSalesEnabled } = dto;
    const [adminSettings] = await this.adminSettingsRepository.find();
    await this.adminSettingsRepository.update({ id: adminSettings.id }, { isSalesEnabled });
  }

  public async updateMinWithdrawSum(dto: AdminSettingsDTO.UpdateMinWithdrawSum) {
    const { minWithdrawSum } = dto;
    const [adminSettings] = await this.adminSettingsRepository.find();
    await this.adminSettingsRepository.update({ id: adminSettings.id }, { minWithdrawSum });
  }
}
