import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsPositive, IsString, Max, Min, ValidateNested } from "class-validator";
import { IsGameEnum } from "../decorator";
import { CsGoRarity, Game } from "../enum";

export class SearchQuery {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  public name?: string;

  @ApiPropertyOptional()
  @IsPositive()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  @Type(() => Number)
  public price?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  public compare?: string;

  @ApiPropertyOptional()
  @Max(30)
  @IsNumber({ maxDecimalPlaces: 0 })
  @IsOptional()
  @Type(() => Number)
  public limit: number = 1;
}

export class UpdatePrice {
  @ApiProperty()
  @Min(0)
  @IsNumber()
  @IsNotEmpty()
  public price: number;
}

class AxiosProxyAuth {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public password: string;
}

class AxiosProxyConfig {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public host: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  public port: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => AxiosProxyAuth)
  public auth?: AxiosProxyAuth;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  public protocol?: string;
}

class Payload {
  @ApiPropertyOptional({ type: "string", example: "Classified" })
  @IsOptional()
  public rarity?: CsGoRarity | number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => AxiosProxyConfig)
  public proxy?: AxiosProxyConfig;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  public offsetStart: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  public offsetEnd: number;
}

export class UpdatePrices {
  @ApiProperty({ example: Game.CSGO })
  @IsGameEnum()
  public game: Game;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => Payload)
  public payload?: Payload;
}
