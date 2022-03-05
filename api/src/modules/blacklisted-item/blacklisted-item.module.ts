import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlacklistedItemController } from './blacklisted-item.controller';
import { BlacklistedItemEntity } from './blacklisted-item.entity';
import { BlacklistedItemService } from './blacklisted-item.service';

@Module({
  imports: [TypeOrmModule.forFeature([BlacklistedItemEntity])],
  providers: [BlacklistedItemService],
  controllers: [BlacklistedItemController],
  exports: [BlacklistedItemService],
})
export class BlacklistedItemModule {}
