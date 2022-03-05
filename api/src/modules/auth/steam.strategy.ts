import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Profile } from 'passport';
import { Strategy } from 'passport-steam';
import { getDeviceFromReq } from '../../common/functions/get-device-from-req';
import { getIpFromReq } from '../../common/functions/get-ip-from-req';
import { UserEntity } from '../user/user.entity';
import { AuthService } from './auth.service';

@Injectable()
export class SteamStrategy extends PassportStrategy(Strategy, 'steam') {
  constructor(private configService: ConfigService, private authService: AuthService) {
    super({
      returnURL: configService.get('siteUrl') + 'api/auth/steam-redirect',
      realm: configService.get('siteUrl'),
      apiKey: configService.get('steamApiKey'),
      passReqToCallback: true,
    });
  }

  public async validate(
    req: Request,
    identifier: string,
    profile: Profile,
    done: (err: Error, user: UserEntity) => void,
  ) {
    try {
      const dto = {
        username: profile.displayName,
        avatar: profile.photos[profile.photos.length - 1].value,
        steamId64: profile.id,
        ip: getIpFromReq(req),
        device: getDeviceFromReq(req),
        referralCode: req.cookies?.['referralCode'] || null,
      };

      const user = await this.authService.getOrCreateOAuth(dto);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  }
}
