import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Max, Min } from "class-validator";
import { IsGameEnum } from "../decorator";
import { Game } from "../enum";

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

export class UpdatePrices {
  @ApiProperty()
  @IsGameEnum()
  public game: Game;
}
