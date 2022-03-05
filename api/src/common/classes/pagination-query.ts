import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, Max, Min } from 'class-validator';

export class PaginationQuery {
  @ApiProperty()
  @Max(100)
  @Min(1)
  @IsNumber()
  @Type(() => Number)
  public take: number;

  @ApiProperty()
  @Min(0)
  @IsNumber()
  @Type(() => Number)
  public skip: number;
}
