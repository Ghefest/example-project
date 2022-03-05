import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetMeRO, StaffDTO } from '@pot-back/common';
import { Request, Response } from 'express';
import { HttpResponse } from '../../common/classes/http.response';
import { User } from '../../common/decorators/param/user.decorator';
import { AuthenticatedGuard } from '../../common/guards/authenticated.guard';
import { StaffAuthGuard } from '../../common/guards/staff-auth.guard';
import { SteamAuthGuard } from '../../common/guards/steam-auth.guard';
import { SteamChangeAccountAuthGuard } from '../../common/guards/steam-change-account-auth.guard';
import { MapTo } from '../../common/interceptors/mapper.interceptor.ts';
import config from '../../config/config';
import { UserEntity } from '../user/user.entity';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('steam')
  @UseGuards(SteamAuthGuard)
  public steamAuth() {}

  @Get('steam-redirect')
  @UseGuards(SteamAuthGuard)
  async steamRedirect(@User() user, @Res() res) {
    // todo move links somewhere
    if (user) res.redirect('http://localhost:3000/auth/steam-ok');
    else res.redirect('http://localhost:3000/auth/steam-failure');
  }

  @Get('steam-change-account')
  @UseGuards(SteamChangeAccountAuthGuard)
  public steamChangeAccountAuth() {}

  @Get('steam-change-account-redirect')
  @UseGuards(SteamChangeAccountAuthGuard)
  async steamChangeAccountRedirect(@User() user, @Res() res) {
    // todo move links somewhere
    if (user) res.redirect('http://localhost:3000/auth/steam-change-account-ok');
    else res.redirect('http://localhost:3000/auth/steam-change-account-failure');
  }

  @ApiCookieAuth()
  @ApiOkResponse({ type: GetMeRO })
  @Get('me')
  @MapTo(GetMeRO)
  @UseGuards(AuthenticatedGuard)
  async getMe(@User() user: UserEntity) {
    return user;
  }

  @ApiCookieAuth()
  @Get('logout')
  @UseGuards(AuthenticatedGuard)
  async logout(@Req() req: Request, @Res() res: Response) {
    req.logout();
    req.session.destroy(err => {
      if (err) throw err;
      const response = new HttpResponse({ isSuccess: true });
      const { sessionCookieName } = config();

      res.clearCookie(sessionCookieName);
      res.status(HttpStatus.OK);
      res.send(response);
    });
  }

  @ApiCookieAuth()
  @Post('staff/register')
  @UseGuards(AuthenticatedGuard)
  async registerStaff(@Body() dto: StaffDTO.Create) {
    return await this.authService.registerStaff(dto);
  }

  @ApiCookieAuth()
  @UseGuards(StaffAuthGuard)
  @Post('staff/login')
  async loginStaff(@User() user) {
    return user;
  }
}
