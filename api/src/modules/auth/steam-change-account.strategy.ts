import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Profile } from 'passport';
import { Strategy } from 'passport-steam';
import { SessionService } from '../session/session.service';
import { UserEntity } from '../user/user.entity';
import { AuthService } from './auth.service';
import { YouAreNotLoggedInException } from './exceptions/you-are-not-logged-in.exception';

@Injectable()
export class SteamChangeAccountStrategy extends PassportStrategy(Strategy, 'steam-change-account') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
    private sessionService: SessionService,
  ) {
    super({
      returnURL: configService.get('siteUrl') + '/api/auth/steam-change-account-redirect',
      realm: configService.get('siteUrl'),
      apiKey: configService.get('steamApiKey'),
      passReqToCallback: true,
    });
  }

  public async validate(
    req: Request,
    identifier: string,
    profile: Profile,
    done: (err: Error, user: Partial<UserEntity>) => void,
  ) {
    try {
      if (!req.sessionID) {
        throw new YouAreNotLoggedInException();
      }

      const session = await this.sessionService.getById(req.sessionID);
      if (!req.sessionID) {
        throw new YouAreNotLoggedInException();
      }

      const userId = session.sess?.passport?.user;
      if (!userId) {
        throw new YouAreNotLoggedInException();
      }

      await this.authService.changeSteamAccount(userId, profile.id);

      done(null, { id: userId });
    } catch (err) {
      done(err, null);
    }
  }
}
