import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupportLetterController } from './support-letter.controller';
import { SupportLetterEntity } from './support-letter.entity';
import { SupportLetterService } from './support-letter.service';

@Module({
  imports: [TypeOrmModule.forFeature([SupportLetterEntity])],
  providers: [SupportLetterService],
  controllers: [SupportLetterController],
})
export class SupportLetterModule {}
