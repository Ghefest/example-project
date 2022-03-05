import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInventoryCsGoItemEntity } from './user-inventory-csgo-item.entity';
import { UserInventoryDota2ItemEntity } from './user-inventory-dota2-item.entity';
import { UserInventoryItemEntity } from './user-inventory-item.entity';
import { UserInventoryItemRepository } from './user-inventory-item.repository';
import { UserInventoryController } from './user-inventory.controller';
import { UserInventoryFacade } from './user-inventory.facade';
import { UserInventoryService } from './user-inventory.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserInventoryItemEntity,
      UserInventoryCsGoItemEntity,
      UserInventoryDota2ItemEntity,
      UserInventoryItemRepository,
    ]),
  ],
  providers: [UserInventoryService, UserInventoryFacade],
  controllers: [UserInventoryController],
  exports: [UserInventoryService],
})
export class UserInventoryModule {}
