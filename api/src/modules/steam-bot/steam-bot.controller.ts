import { Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { SteamBotDTO } from '@pot-back/common';
import { AuthenticatedGuard } from '../../common/guards/authenticated.guard';
import { SteamBotService } from './steam-bot.service';

@ApiTags('steam-bots')
@ApiCookieAuth()
@Controller('steam-bots')
@UseGuards(AuthenticatedGuard)
export class SteamBotController {
  constructor(private steamBotService: SteamBotService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('maFile'))
  public async create(@UploadedFile() file, @Body() dto: SteamBotDTO.CreateSteamBot) {
    dto.maFile = file;

    return this.steamBotService.create(dto);
  }
}
