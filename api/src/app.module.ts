import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { I18nJsonParser, I18nModule } from 'nestjs-i18n';
import * as path from 'path';
import config from './config/config';
import { AdminSettingsModule } from './modules/admin-settings/admin-settings.module';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { BlacklistedItemModule } from './modules/blacklisted-item/blacklisted-item.module';
import { CsMoneyPricesModule } from './modules/cs-money-prices/cs-money-prices.module';
import { CsMoneyModule } from './modules/cs-money/cs-money.module';
import { SellModule } from './modules/sell/sell.module';
import { SessionModule } from './modules/session/session.module';
import { SteamBotModule } from './modules/steam-bot/steam-bot.module';
import { SteamMarketPricesModule } from './modules/steam-market-prices/steam-market-prices.module';
import { UserInventoryModule } from './modules/user-inventory/user-inventory.module';
import { UserModule } from './modules/user/user.module';
import * as winston from 'winston';
import { ItemsXsModule } from './modules/items-xs/items-xs.module';
import { BlacklistedItemTypeModule } from './modules/blacklisted-item-type/blacklisted-item-type.module';
import { StaffModule } from './modules/staff/staff.module';
import { PaymentModule } from './modules/payment/payment.module';
import { SupportLetterModule } from './modules/support-letter/support-letter.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config] }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(winston.format.timestamp(), nestWinstonModuleUtilities.format.nestLike()),
        }),
        new winston.transports.File({ filename: './logs.log' }),
      ],
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'ru',
      parser: I18nJsonParser,
      parserOptions: {
        path: path.join(__dirname, '/i18n/'),
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.get('database');
      },
    }),
    ScheduleModule.forRoot(),
    UserModule,
    AuthModule,
    SteamMarketPricesModule,
    SessionModule,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.get('bull');
      },
    }),
    CsMoneyModule,
    CsMoneyPricesModule,
    AdminSettingsModule,
    BlacklistedItemModule,
    BlacklistedItemTypeModule,
    UserInventoryModule,
    SteamBotModule,
    SellModule,
    AdminModule,
    ItemsXsModule,
    StaffModule,
    PaymentModule,
    SupportLetterModule,
  ],
})
export class AppModule {}
