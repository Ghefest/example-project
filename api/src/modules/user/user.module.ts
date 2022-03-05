import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeoIpModule } from '../geo-ip/geo-ip.module';
import { SteamBotModule } from '../steam-bot/steam-bot.module';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { UserGateway } from './user.gateway';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    GeoIpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        accountID: configService.get('geoIp.accountID'),
        licenseKey: configService.get('geoIp.licenseKey'),
        options: configService.get('geoIp.options'),
      }),
    }),
    SteamBotModule,
  ],
  providers: [UserService, UserGateway, Logger],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
