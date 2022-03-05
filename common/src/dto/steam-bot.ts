import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Game } from "../enum";

export class CreateSteamBot {
  @ApiProperty()
  @IsString()
  public accountName: string;

  @ApiProperty()
  @IsString()
  public password: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  public proxy: string;

  @ApiProperty({ type: "file" })
  public maFile: { buffer: Buffer };

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => Boolean(value))
  public isAdmin?: boolean;
}

export class GetInventory {
  @ApiProperty()
  @IsString()
  public accountName: string;

  @ApiProperty()
  @IsNotEmpty()
  public games: Game[];
}
