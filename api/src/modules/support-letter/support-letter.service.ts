import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupportLetterDTO } from '../../../../common/dist';
import { SupportLetterEntity } from './support-letter.entity';

@Injectable()
export class SupportLetterService {
  constructor(
    @InjectRepository(SupportLetterEntity) private supportLetterRepository: Repository<SupportLetterEntity>,
  ) {}

  public async create(dto: SupportLetterDTO.Create) {
    const { email, subject, message, image } = dto;

    const supportLetter = new SupportLetterEntity();
    supportLetter.email = email;
    supportLetter.subject = subject;
    supportLetter.message = message;
    if (image) supportLetter.image = image;

    await this.supportLetterRepository.save(supportLetter);
  }
}
