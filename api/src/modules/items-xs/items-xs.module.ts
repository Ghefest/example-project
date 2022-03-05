import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemNameXEntity } from './item-name-x.entity';
import { ItemTypeXEntity } from './item-type-x.entity';
import { ItemsXsController } from './items-xs.controller';
import { ItemsXsService } from './items-xs.service';

@Module({
  imports: [TypeOrmModule.forFeature([ItemNameXEntity, ItemTypeXEntity])],
  providers: [ItemsXsService],
  controllers: [ItemsXsController],
})
export class ItemsXsModule {}
