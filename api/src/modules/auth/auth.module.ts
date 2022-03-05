import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { SessionModule } from '../session/session.module';
import { StaffModule } from '../staff/staff.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SessionSerializer } from './session.serializer';
import { StaffStrategy } from './staff.strategy';
import { SteamChangeAccountStrategy } from './steam-change-account.strategy';
import { SteamStrategy } from './steam.strategy';

@Module({
  imports: [PassportModule, UserModule, ConfigModule, SessionModule, StaffModule],
  providers: [AuthService, SessionSerializer, SteamStrategy, SteamChangeAccountStrategy, StaffStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
