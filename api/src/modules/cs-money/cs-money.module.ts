import { HttpModule, Module } from '@nestjs/common';
import { CsMoneyService } from './cs-money.service';

@Module({
  imports: [HttpModule],
  providers: [CsMoneyService],
  exports: [CsMoneyService],
})
export class CsMoneyModule {}
