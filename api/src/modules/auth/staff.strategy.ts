import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { StaffEntity } from '../staff/staff.entity';
import { WrongTwoFactorCodeException } from './exceptions/wrong-two-factor-code.exception';

@Injectable()
export class StaffStrategy extends PassportStrategy(Strategy, 'staff') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'login',
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    login: string,
    password: string,
    done: (err: Error, staff: StaffEntity) => void,
  ): Promise<any> {
    try {
      const code = req.body?.code;
      if (!code) throw new WrongTwoFactorCodeException();

      const staff = await this.authService.validateStaff({ login, password, code });

      if (!staff) throw new UnauthorizedException();

      done(null, staff);
    } catch (err) {
      done(err, null);
    }
  }
}
