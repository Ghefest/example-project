import { Body, Controller, Patch, Put, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { UserDTO } from '@pot-back/common';
import { User } from '../../common/decorators/param/user.decorator';
import { AuthenticatedGuard } from '../../common/guards/authenticated.guard';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@ApiTags('users')
@ApiCookieAuth()
@Controller('users')
@UseGuards(AuthenticatedGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Patch('trade-offer-link')
  public async updateTradeLink(@User() user: UserEntity, @Body() dto: UserDTO.UpdateTradeOfferLinkDTO) {
    return await this.userService.updateTradeOfferLink(user, dto);
  }

  @Patch('email')
  public async updateEmail(@User() user: UserEntity, @Body() dto: UserDTO.UpdateEmailDTO) {
    return await this.userService.updateEmail(user, dto);
  }

  @Patch('telegram-tag')
  public async updateTelegramTag(@User() user: UserEntity, @Body() dto: UserDTO.UpdateTelegramTagDTO) {
    return await this.userService.updateTelegramTag(user, dto);
  }

  @Patch('username')
  public async updateUsername(@User() user: UserEntity, @Body() dto: UserDTO.UpdateUsernameDTO) {
    return await this.userService.updateUsername(user, dto);
  }

  @Patch('referral-code')
  public async updateReferralCode(@User() user: UserEntity, @Body() dto: UserDTO.UpdateReferralCodeDTO) {
    return await this.userService.updateReferralCode(user, dto);
  }

  @Patch('referrer')
  public async updateReferrer(@User() user: UserEntity, @Body() dto: UserDTO.UpdateReferrerDTO) {
    return await this.userService.updateReferrer(user, dto);
  }

  @Put('payout-options')
  public async updatePayoutOptions(@User() user: UserEntity, @Body() dto: UserDTO.UpdatePayoutOptions) {
    return await this.userService.updatePayoutOptions(user.id, dto);
  }
}
