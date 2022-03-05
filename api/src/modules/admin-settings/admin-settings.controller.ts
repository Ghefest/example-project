import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { AdminSettingsDTO } from '@pot-back/common';
import { AuthenticatedGuard } from '../../common/guards/authenticated.guard';
import { AdminSettingsService } from './admin-settings.service';

@ApiTags('admin-settings')
@ApiCookieAuth()
@UseGuards(AuthenticatedGuard)
@Controller('admin-settings')
export class AdminSettingsController {
  constructor(private adminSettingsService: AdminSettingsService) {}

  @Get()
  async get() {
    return await this.adminSettingsService.get();
  }

  @Patch('price-formula-x')
  async updatePriceFormulaX(@Body() dto: AdminSettingsDTO.UpdatePriceFormulaX) {
    return await this.adminSettingsService.updatePriceFormulaX(dto);
  }

  @Patch('item-buy-min-price')
  async updateItemBuyMinPrice(@Body() dto: AdminSettingsDTO.UpdateItemBuyMinPrice) {
    return await this.adminSettingsService.updateItemBuyMinPrice(dto);
  }

  @Patch('item-buy-max-price')
  async updateItemBuyMaxPrice(@Body() dto: AdminSettingsDTO.UpdateItemBuyMaxPrice) {
    return await this.adminSettingsService.updateItemBuyMaxPrice(dto);
  }

  @Patch('is-sales-enabled')
  async updateIsSalesEnabled(@Body() dto: AdminSettingsDTO.UpdateIsSalesEnabled) {
    return await this.adminSettingsService.updateIsSalesEnabled(dto);
  }

  @Patch('min-withdraw-sum')
  async updateMinWithdrawSum(@Body() dto: AdminSettingsDTO.UpdateMinWithdrawSum) {
    return await this.adminSettingsService.updateMinWithdrawSum(dto);
  }
}
