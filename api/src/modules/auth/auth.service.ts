import { Injectable } from '@nestjs/common';
import { authenticator } from '@otplib/preset-default';
import { StaffService } from '../staff/staff.service';
import { OAuthDTO } from '../user/dtos/o-auth.dto';
import { UserService } from '../user/user.service';
import * as QRCode from 'qrcode';
import { PasswordHasher } from '../../common/classes/password-hasher';
import { UserWithLoginNotFoundException } from './exceptions/user-with-login-not-found.exception';
import { WrongPasswordException } from './exceptions/wrong-password.exception';
import { WrongTwoFactorCodeException } from './exceptions/wrong-two-factor-code.exception';
import { StaffDTO } from '@pot-back/common';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private staffService: StaffService) {}

  public async getUserById(userId: number) {
    return await this.userService.getById(userId);
  }

  public async getStaffById(staffId: number) {
    return await this.staffService.getById(staffId);
  }

  public async getOrCreateOAuth(dto: OAuthDTO) {
    return await this.userService.getOrCreateOAuth(dto);
  }

  public async changeSteamAccount(userId: number, newSteamId64: string) {
    return await this.userService.updateSteamId64(userId, newSteamId64);
  }

  public async registerStaff(dto: StaffDTO.Create) {
    const staff = await this.staffService.create(dto);
    const otpauth = authenticator.keyuri(staff.login, 'pot-back', staff.google2faSecret);

    try {
      const qrCodeUrl = await QRCode.toDataURL(otpauth);

      return { qrCodeUrl };
    } catch (err) {
      return { secret: staff.google2faSecret };
    }
  }

  public async validateStaff(dto: { login: string; password: string; code: string }) {
    const { login, password, code } = dto;
    const staff = await this.staffService.getByLogin(login);
    if (!staff) throw new UserWithLoginNotFoundException({ login });

    const isPasswordValid = await PasswordHasher.compare(password, staff.password);
    if (!isPasswordValid) throw new WrongPasswordException();

    const isCodeValid = authenticator.verify({ token: code, secret: staff.google2faSecret });
    if (!isCodeValid) throw new WrongTwoFactorCodeException();

    return staff;
  }
}
