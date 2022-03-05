import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SessionEntity } from './session.entity';

@Injectable()
export class SessionService {
  constructor(@InjectRepository(SessionEntity) private sessionRepository: Repository<SessionEntity>) {}

  public async getById(id: string) {
    return await this.sessionRepository.findOne({ sid: id });
  }
}
