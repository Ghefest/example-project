import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrencyRateEntity } from './currency-rate.entity';
import { CurrencyRateService } from './currency-rate.service';

@Module({
  imports: [TypeOrmModule.forFeature([CurrencyRateEntity]), HttpModule, ConfigModule],
  providers: [CurrencyRateService],
  exports: [CurrencyRateService],
})
export class CurrencyRateModule {}
