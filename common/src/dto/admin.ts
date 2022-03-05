import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsIn, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Max, Min } from "class-validator";

export class GetUsers {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  public username?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  public steamId64?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  public countryCode?: string;

  @ApiPropertyOptional()
  @IsIn(["balance", "salesSum", "inventoryPrice", "isOnline", "profitFromReferrals"])
  @IsString()
  @IsOptional()
  public sort?: "balance" | "salesSum" | "inventoryPrice" | "isOnline" | "profitFromReferrals";

  @ApiPropertyOptional()
  @IsIn(["ASC", "DESC"])
  @IsString()
  @IsOptional()
  public order?: "ASC" | "DESC";

  @ApiProperty()
  @Min(1)
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsNotEmpty()
  public take: number;

  @ApiProperty()
  @Min(0)
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsNotEmpty()
  public skip: number;
}

export class UpdateUserIsBalanceBanned {
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  public isBalanceBanned: boolean;
}

export class UpdateUserBalance {
  @ApiProperty()
  @Max(100_000)
  @Min(0)
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  public balance: number;
}

export class UpdateUserPercentFromReferralSales {
  @ApiProperty()
  @Max(100)
  @Min(0)
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  public percent: number;
}
