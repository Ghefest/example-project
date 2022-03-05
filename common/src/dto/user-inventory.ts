import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { IsCsGoType, IsDota2Rarity } from "../decorator";
import { Game } from "../enum";

class InventoryQuery {
  @ApiProperty({ type: "number", isArray: true })
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value.map(v => Number(v));
    else return [Number(value)];
  })
  public games: Game[];

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  public take: number = 10;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  public skip: number = 0;

  @ApiPropertyOptional()
  @IsIn(["name", "price"])
  @IsOptional()
  public sort: "name" | "price" = "price";

  @ApiPropertyOptional()
  @IsIn(["ASC", "DESC"])
  @IsOptional()
  public order: "ASC" | "DESC" = "DESC";

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @Transform(({ value }) => {
    return String(value).trim();
  })
  public name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsCsGoType({ each: true })
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value.map(v => String(v));
    else return [String(value)];
  })
  public types?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDota2Rarity({ each: true })
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value.map(v => String(v));
    else return [String(value)];
  })
  public rarities?: string;
}

export class GetInventoryQuery extends InventoryQuery {}
export class ReloadInventoryQuery extends InventoryQuery {}
