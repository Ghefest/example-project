import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CsMoneyModule } from '../cs-money/cs-money.module';
import { CS_MONEY_PRICES_QUEUE } from './constants';
import { CsMoneyItemEntity } from './cs-money-item.entity';
import { CsMoneyPricesConsumer } from './cs-money-prices.consumer';
import { CsMoneyController } from './cs-money-prices.controller';
import { CsMoneyPricesService } from './cs-money-prices.sevice';

@Module({
  imports: [
    TypeOrmModule.forFeature([CsMoneyItemEntity]),
    CsMoneyModule,
    BullModule.registerQueueAsync({
      name: CS_MONEY_PRICES_QUEUE,
      useFactory: async () => {
        return { name: CS_MONEY_PRICES_QUEUE };
      },
    }),
  ],
  controllers: [CsMoneyController],
  providers: [CsMoneyPricesService, CsMoneyPricesConsumer],
  exports: [CsMoneyPricesService],
})
export class CsMoneyPricesModule {}
