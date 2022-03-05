import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PasswordHasher } from '../../common/classes/password-hasher';
import { StaffEntity } from './staff.entity';
import { authenticator } from 'otplib';
import { StaffDTO } from '@pot-back/common';

@Injectable()
export class StaffService {
  constructor(@InjectRepository(StaffEntity) private staffRepository: Repository<StaffEntity>) {}

  public async create(dto: StaffDTO.Create) {
    const { login, password, role } = dto;

    const staff = new StaffEntity();
    staff.login = login;
    staff.password = await PasswordHasher.hash(password);
    staff.role = role;
    staff.google2faSecret = authenticator.generateSecret();

    return await this.staffRepository.save(staff);
  }

  public async getById(id: number) {
    return await this.staffRepository.findOne({ id });
  }

  public async getByLogin(login: string) {
    return await this.staffRepository.findOne({ login });
  }
}
