import { BullModule } from '@nestjs/bull';
import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminSettingsModule } from '../admin-settings/admin-settings.module';
import { BonusModule } from '../bonus/bonus.module';
import { PaymentModule } from '../payment/payment.module';
import { SteamBotModule } from '../steam-bot/steam-bot.module';
import { UserInventoryModule } from '../user-inventory/user-inventory.module';
import { UserModule } from '../user/user.module';
import { SellItemEntity } from './sell-item.entity';
import { SELL_QUEUE } from './sell.constants';
import { SellConsumer } from './sell.consumer';
import { SellController } from './sell.controller';
import { SellEntity } from './sell.entity';
import { SellFacade } from './sell.facade';
import { SellGateway } from './sell.gateway';
import { SellService } from './sell.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SellEntity, SellItemEntity]),
    UserInventoryModule,
    BullModule.registerQueue({
      name: SELL_QUEUE,
    }),
    SteamBotModule,
    AdminSettingsModule,
    BonusModule,
    UserModule,
    PaymentModule,
  ],
  providers: [SellService, SellFacade, SellConsumer, SellGateway, Logger],
  controllers: [SellController],
  exports: [SellFacade],
})
export class SellModule {}
