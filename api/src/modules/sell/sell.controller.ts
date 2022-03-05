import { Body, Controller, Get, Ip, Post, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { SellDTO, SellRO } from '@pot-back/common';
import { UserAgent } from '../../common/decorators/param/user-agent.decorator';
import { User } from '../../common/decorators/param/user.decorator';
import { AuthenticatedGuard } from '../../common/guards/authenticated.guard';
import { MapTo } from '../../common/interceptors/mapper.interceptor.ts';
import { UserEntity } from '../user/user.entity';
import { SellService } from './sell.service';

@ApiTags('sales')
@Controller('sales')
export class SellController {
  constructor(private sellService: SellService) {}

  @ApiCookieAuth()
  @Get('active')
  @UseGuards(AuthenticatedGuard)
  @MapTo(SellRO)
  async getActiveSell(@User() user: UserEntity) {
    return this.sellService.getActiveSell(user.id);
  }

  @ApiCookieAuth()
  @Post()
  @UseGuards(AuthenticatedGuard)
  @MapTo(SellRO)
  async createSell(
    @Body() dto: SellDTO.CreateSell,
    @User() user: UserEntity,
    @Ip() ip: string,
    @UserAgent() userAgent: string,
  ) {
    return this.sellService.create(dto, user, { ip, userAgent });
  }

  @ApiCookieAuth()
  @Get('completed/total-sum')
  @UseGuards(AuthenticatedGuard)
  public async getTotalSumOfCompletedSales(@User() user: UserEntity) {
    return this.sellService.getTotalSumOfCompletedSales(user.id);
  }

  @Get('completed/last/items')
  public async getLastItemsOfCompletedTrades() {
    return this.sellService.getLastItemsOfCompletedTrades();
  }
}
