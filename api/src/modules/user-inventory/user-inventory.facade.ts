import { Injectable } from '@nestjs/common';
import { UserInventoryDTO } from '@pot-back/common';
import { UserEntity } from '../user/user.entity';
import { UserInventoryService } from './user-inventory.service';

@Injectable()
export class UserInventoryFacade {
  constructor(private userInventoryService: UserInventoryService) {}

  public async getUserInventory(dto: UserInventoryDTO.GetInventoryQuery, user: UserEntity) {
    const { games } = dto;
    let inventory = await this.userInventoryService.getInventory(dto, user);
    if (!inventory?.items?.length) {
      await this.userInventoryService.loadInventoryFromSteam(games, user);
      inventory = await this.userInventoryService.getInventory(dto, user);
    }

    return inventory;
  }

  public async reloadUserInventoryAndGet(dto: UserInventoryDTO.ReloadInventoryQuery, user: UserEntity) {
    const { games } = dto;
    await this.userInventoryService.clearInventory(games, user);
    await this.userInventoryService.loadInventoryFromSteam(games, user);
    return await this.userInventoryService.getInventory(dto, user);
  }
}
