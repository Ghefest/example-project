import { Injectable } from '@nestjs/common';
import { AdminDTO, UserInventoryDTO } from '@pot-back/common';
import { PaginationQuery } from '../../common/classes/pagination-query';
import { SellFacade } from '../sell/sell.facade';
import { UserInventoryService } from '../user-inventory/user-inventory.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AdminService {
  constructor(
    private userService: UserService,
    private userInventoryService: UserInventoryService,
    private sellFacade: SellFacade,
  ) {}

  public async getUsers(query: AdminDTO.GetUsers) {
    const [users, total] = await this.userService.getMany(query);

    return { users, total };
  }

  public async getUserById(userId: number) {
    const user = await this.userService.getById(userId);
    user.inventoryPrice = await this.userInventoryService.getUserInventoryPrice(userId);
    user.salesSum = await this.sellFacade.getUserSalesSum(userId);

    return { ...user };
  }

  public async getUserInventoryById(userId: number, searchQuery: UserInventoryDTO.GetInventoryQuery) {
    const user = await this.userService.getById(userId);
    return await this.userInventoryService.getInventory(searchQuery, user);
  }

  public async getUserSalesSum(userId: number) {
    const sumOfCompletedSales = await this.sellFacade.getUserSalesSum(userId);
    return { sumOfCompletedSales };
  }

  public async updateUserIsBalanceBanned(userId: number, dto: AdminDTO.UpdateUserIsBalanceBanned) {
    const { isBalanceBanned } = dto;
    await this.userService.updateIsBalanceBanned(userId, isBalanceBanned);
  }

  public async updateUserBalance(userId: number, dto: AdminDTO.UpdateUserBalance) {
    const { balance } = dto;
    await this.userService.updateBalance(userId, balance);
  }

  public async updateUserPercentFromReferralSales(userId: number, dto: AdminDTO.UpdateUserPercentFromReferralSales) {
    const { percent } = dto;
    await this.userService.updatePercentFromReferralSales(userId, percent);
  }

  public async getUserReferrals(userId: number) {
    return await this.userService.getReferrals(userId);
  }
}
