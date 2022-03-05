import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsString, Length, MaxLength } from "class-validator";

export class Create {
  @ApiProperty()
  @Length(4, 24)
  @Transform(({ value }) => value.trim())
  @IsString()
  public login: string;

  @ApiProperty()
  @Length(4, 24)
  @Transform(({ value }) => value.trim())
  @IsString()
  public password: string;

  @ApiProperty({ type: "string" })
  @MaxLength(15)
  @Transform(({ value }) => value.trim())
  @IsString()
  public role: any;
}
