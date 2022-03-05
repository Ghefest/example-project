import { Module } from '@nestjs/common';
import { BonusService } from './bonus.service';

@Module({
  imports: [BonusService],
  providers: [BonusService],
  exports: [BonusService],
})
export class BonusModule {}
