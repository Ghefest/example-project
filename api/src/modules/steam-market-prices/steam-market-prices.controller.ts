import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { SteamMarketPricesDTO } from '@pot-back/common';
import { AuthenticatedGuard } from '../../common/guards/authenticated.guard';
import { SteamMarketPricesService } from './steam-market-prices.service';

@ApiCookieAuth()
@UseGuards(AuthenticatedGuard)
@ApiTags('steam-market-prices')
@Controller('steam-market-prices')
export class SteamMarketPricesController {
  constructor(private steamMarketPricesService: SteamMarketPricesService) {}

  @ApiParam({ name: 'name', required: true })
  @Patch('price/:name')
  async updatePrice(@Param('name') name: string, @Body() dto: SteamMarketPricesDTO.UpdatePrice) {
    return await this.steamMarketPricesService.updatePriceByName(name, dto);
  }

  @Get('search')
  async searchByPrice(@Query() query: SteamMarketPricesDTO.SearchQuery) {
    return await this.steamMarketPricesService.search(query);
  }

  @Post('jobs/update-prices')
  async updatePrices(@Body() dto: SteamMarketPricesDTO.UpdatePrices) {
    return await this.steamMarketPricesService.addJob(dto);
  }

  @Get('jobs/active')
  async getActiveJobs() {
    return await this.steamMarketPricesService.getActiveJobs();
  }
}
