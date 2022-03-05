import { Module } from '@nestjs/common';
import { SellModule } from '../sell/sell.module';
import { UserInventoryModule } from '../user-inventory/user-inventory.module';
import { UserModule } from '../user/user.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [SellModule, UserModule, UserInventoryModule],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
