import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SteamBotController } from './steam-bot.controller';
import { SteamBotEntity } from './steam-bot.entity';
import { SteamBotService } from './steam-bot.service';

@Module({
  imports: [TypeOrmModule.forFeature([SteamBotEntity])],
  providers: [SteamBotService],
  controllers: [SteamBotController],
  exports: [SteamBotService],
})
export class SteamBotModule {}
