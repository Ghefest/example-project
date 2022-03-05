import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { CsMoneyPricesDTO } from '@pot-back/common';
import { AuthenticatedGuard } from '../../common/guards/authenticated.guard';
import { CsMoneyPricesService } from './cs-money-prices.sevice';

@ApiCookieAuth()
@UseGuards(AuthenticatedGuard)
@ApiTags('cs-money-prices')
@Controller('cs-money-prices')
export class CsMoneyController {
  constructor(private csMoneyPricesService: CsMoneyPricesService) {}

  @Get('search')
  async search(@Query() dto: CsMoneyPricesDTO.SearchQuery) {
    return await this.csMoneyPricesService.search(dto);
  }

  @ApiParam({ name: 'name', required: true })
  @Patch('price/:name')
  async updatePriceByName(@Param('name') name: string, @Body() dto: CsMoneyPricesDTO.UpdatePrice) {
    return await this.csMoneyPricesService.updatePriceByName(name, dto);
  }

  @Post('jobs/update-prices')
  async updatePrices(@Body() dto: CsMoneyPricesDTO.UpdatePrices) {
    return await this.csMoneyPricesService.addJob(dto);
  }

  @Get('jobs/active')
  async getActiveJobs() {
    return await this.csMoneyPricesService.getActiveJobs();
  }
}
