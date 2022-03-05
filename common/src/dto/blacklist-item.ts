import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

class Base {
  @ApiProperty()
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => String(value).trim())
  public name: string;
}

export class Create extends Base {}
export class GetByName extends Base {}
export class DeleteByName extends Base {}
