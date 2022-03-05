import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { AdminDTO, UserInventoryDTO } from '@pot-back/common';
import { PaginationQuery } from '../../common/classes/pagination-query';
import { AuthenticatedGuard } from '../../common/guards/authenticated.guard';
import { SellFacade } from '../sell/sell.facade';
import { AdminService } from './admin.service';

@ApiTags('admin')
@Controller('admin')
@ApiCookieAuth()
@UseGuards(AuthenticatedGuard)
export class AdminController {
  constructor(private sellFacade: SellFacade, private adminService: AdminService) {}

  @Post('sell/accept/:id')
  public async acceptSell(@Param('id') id: number) {
    return await this.sellFacade.accept(id);
  }

  @Get('users')
  public async getUsers(@Query() query: AdminDTO.GetUsers) {
    return await this.adminService.getUsers(query);
  }

  @Get('users/:id')
  public async getUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.adminService.getUserById(id);
  }

  @Get('users/:id/inventory')
  public async getUserInventoryById(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: UserInventoryDTO.GetInventoryQuery,
  ) {
    return await this.adminService.getUserInventoryById(id, query);
  }

  @Get('users/:id/sales-sum')
  public async getUserSalesSum(@Param('id', ParseIntPipe) id: number) {
    return await this.adminService.getUserSalesSum(id);
  }

  @Get('users/:id/referrals')
  public async getUserReferrals(@Param('id', ParseIntPipe) id: number) {
    return await this.adminService.getUserReferrals(id);
  }

  @Patch('users/:id/is-balance-banned')
  public async updateUserIsBalanceBanned(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AdminDTO.UpdateUserIsBalanceBanned,
  ) {
    return await this.adminService.updateUserIsBalanceBanned(id, dto);
  }

  @Patch('users/:id/balance')
  public async updateUserBalance(@Param('id', ParseIntPipe) id: number, @Body() dto: AdminDTO.UpdateUserBalance) {
    return await this.adminService.updateUserBalance(id, dto);
  }

  @Patch('users/:id/percent-from-referral-sales')
  public async updateUserPercentFromReferralSales(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AdminDTO.UpdateUserPercentFromReferralSales,
  ) {
    return await this.adminService.updateUserPercentFromReferralSales(id, dto);
  }
}
