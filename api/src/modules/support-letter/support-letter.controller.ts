import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SupportLetterDTO } from '../../../../common/dist';
import { ImgBBStorage } from '../../common/multer-storage/img-bb.storage';
import config from '../../config/config';
import { SupportLetterService } from './support-letter.service';

@Controller('support-letter')
export class SupportLetterController {
  constructor(private supportLetterService: SupportLetterService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', { storage: new ImgBBStorage(config) }))
  async create(@UploadedFile() image, @Body() dto: SupportLetterDTO.Create) {
    dto.image = image?.url;

    await this.supportLetterService.create(dto);
  }
}
