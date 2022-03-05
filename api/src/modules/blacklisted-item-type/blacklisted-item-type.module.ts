import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlacklistedItemTypeController } from './blacklisted-item-type.controller';
import { BlacklistedItemTypeEntity } from './blacklisted-item-type.entity';
import { BlacklistedItemTypeService } from './blacklisted-item-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([BlacklistedItemTypeEntity])],
  providers: [BlacklistedItemTypeService],
  controllers: [BlacklistedItemTypeController],
})
export class BlacklistedItemTypeModule {}
