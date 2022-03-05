import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SteamMarketItemEntity } from './steam-market-item.entity';
import { BullModule } from '@nestjs/bull';
import { STEAM_MARKET_PRICES_QUEUE } from './constants';
import { SteamMarketPricesService } from './steam-market-prices.service';
import { SteamMarketPricesConsumer } from './steam-market-prices.consumer';
import { SteamMarketPricesController } from './steam-market-prices.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([SteamMarketItemEntity]),
    BullModule.registerQueueAsync({
      name: STEAM_MARKET_PRICES_QUEUE,
      useFactory: async () => {
        return { name: STEAM_MARKET_PRICES_QUEUE };
      },
    }),
    HttpModule,
  ],
  controllers: [SteamMarketPricesController],
  providers: [SteamMarketPricesService, SteamMarketPricesConsumer],
  exports: [SteamMarketPricesService],
})
export class SteamMarketPricesModule {}
