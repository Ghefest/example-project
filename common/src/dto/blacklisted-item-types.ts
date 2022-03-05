import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsString, MaxLength } from "class-validator";

class Base {
  @ApiProperty()
  @MaxLength(20)
  @IsString()
  @Transform(({ value }) => String(value).trim())
  public type: string;
}

export class GetByType extends Base {}
export class Create extends Base {}
export class DeleteByType extends Base {}
