import { Controller, Get, Put, Query, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { User } from '../../common/decorators/param/user.decorator';
import { AuthenticatedGuard } from '../../common/guards/authenticated.guard';
import { UserEntity } from '../user/user.entity';
import { UserInventoryFacade } from './user-inventory.facade';
import { UserInventoryDTO } from '@pot-back/common';

@ApiTags('user-inventory')
@ApiCookieAuth()
@Controller('user-inventory')
@UseGuards(AuthenticatedGuard)
export class UserInventoryController {
  constructor(private userInventoryFacade: UserInventoryFacade) {}

  @Get()
  async getInventory(@Query() dto: UserInventoryDTO.GetInventoryQuery, @User() user: UserEntity) {
    return await this.userInventoryFacade.getUserInventory(dto, user);
  }

  @Put()
  async reloadInventory(@Query() dto: UserInventoryDTO.ReloadInventoryQuery, @User() user: UserEntity) {
    return await this.userInventoryFacade.reloadUserInventoryAndGet(dto, user);
  }
}
