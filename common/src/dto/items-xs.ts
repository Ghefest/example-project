import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt, IsString, Max, Min } from "class-validator";

export class CreateItemNameX {
  @ApiProperty()
  @IsString()
  @Transform(({ value }) => String(value).trim())
  public name: string;

  @ApiProperty()
  @Max(99)
  @Min(0)
  @IsInt()
  public x: number;
}

export class UpdateItemNameXByName {
  @ApiProperty()
  @Max(99)
  @Min(0)
  @IsInt()
  public x: number;
}

export class CreateItemTypeX {
  @ApiProperty()
  @IsString()
  @Transform(({ value }) => String(value).trim())
  public type: string;

  @ApiProperty()
  @Max(99)
  @Min(0)
  @IsInt()
  public x: number;
}

export class UpdateItemTypeXByType {
  @ApiProperty()
  @Max(99)
  @Min(0)
  @IsInt()
  public x: number;
}
