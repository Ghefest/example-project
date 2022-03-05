import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminSettingsController } from './admin-settings.controller';
import { AdminSettingsEntity } from './admin-settings.entity';
import { AdminSettingsService } from './admin-settings.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdminSettingsEntity])],
  controllers: [AdminSettingsController],
  providers: [AdminSettingsService],
  exports: [AdminSettingsService],
})
export class AdminSettingsModule {}
