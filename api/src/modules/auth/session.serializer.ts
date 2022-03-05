import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../user/user.entity';
import { AuthService } from './auth.service';
import { UserNotFoundException } from '../user/exceptions/user-not-found.exception';
import { StaffEntity } from '../staff/staff.entity';

interface SerializeData {
  id: number;
  role?: any;
}

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private authService: AuthService) {
    super();
  }

  public serializeUser(data: SerializeData, done: (err: Error, user: SerializeData) => void) {
    done(null, data);
  }

  public async deserializeUser(data: SerializeData, done: (err: Error, user: UserEntity | StaffEntity) => void) {
    try {
      const { id, role } = data;
      let user: UserEntity | StaffEntity;
      if (!role) {
        user = await this.authService.getUserById(id);
      } else {
        user = await this.authService.getStaffById(id);
      }

      if (!user) throw new UserNotFoundException();
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  }
}
