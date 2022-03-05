import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { Contains, IsEmail, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Length, MinLength } from "class-validator";

export class GetMany {
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
  @IsIn(["balance", "isOnline", "inventoryPrice", "salesSum", "profitFromReferrals"])
  @IsString()
  @IsOptional()
  public sort?: "balance" | "isOnline" | "inventoryPrice" | "salesSum" | "profitFromReferrals";

  @ApiPropertyOptional()
  @IsIn(["ASC", "DESC"])
  @IsString()
  @IsOptional()
  public order?: "ASC" | "DESC";

  @ApiProperty()
  @IsNumber()
  public take: number;

  @ApiProperty()
  @IsNumber()
  public skip: number;
}

export class UpdateUsernameDTO {
  @ApiProperty()
  @Length(5, 20)
  @IsString()
  @IsNotEmpty()
  public username: string;
}

export class UpdateEmailDTO {
  @ApiProperty()
  @IsEmail()
  @Transform(({ value: email }) => email.trim())
  @IsString()
  @IsNotEmpty()
  public email: string;
}

export class UpdateTelegramTagDTO {
  @ApiProperty()
  @Transform(({ value: email }) => email.trim())
  @IsString()
  @IsNotEmpty()
  public telegramTag: string;
}

export class UpdateTradeOfferLinkDTO {
  @ApiProperty()
  @Contains("&token=")
  @Contains("https://steamcommunity.com/tradeoffer/new/?partner=")
  @IsUrl()
  @Transform(({ value: email }) => email.trim())
  @IsString()
  @IsNotEmpty()
  public tradeOfferLink: string;
}

export class UpdateReferralCodeDTO {
  @ApiProperty()
  @MinLength(4)
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => String(value).trim())
  public referralCode: string;
}

export class UpdateReferrerDTO {
  @ApiProperty()
  @MinLength(4)
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => String(value).trim())
  public referralCode: string;
}

export class UpdatePayoutOptions {
  @IsIn(["QWRUBnoFees", "CARDRUBNOFEES", "YAMRUB", "BTC", "USDTTRC"])
  @IsString()
  @IsNotEmpty()
  public provider: "QWRUBnoFees" | "CARDRUBNOFEES" | "YAMRUB" | "BTC" | "USDTTRC";

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  public email: string;

  @MinLength(5)
  @IsString()
  @IsNotEmpty()
  public purse: string;
}
