import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayNotEmpty, IsEmail, IsIn, IsNotEmpty, IsNumber, IsString, MinLength, ValidateNested } from "class-validator";

export class CreateSellItem {
  @ApiProperty()
  @IsNumber()
  public id: number;

  @ApiProperty()
  @IsNumber()
  public price: number;
}

export class CreateSell {
  @ApiProperty()
  @ValidateNested()
  @ArrayNotEmpty()
  @Type(() => CreateSellItem)
  public items: CreateSellItem[];

  @ApiProperty()
  @IsIn(["QWRUBnoFees", "CARDRUBNOFEES", "YAMRUB", "BTC", "USDTTRC"])
  @IsString()
  @IsNotEmpty()
  public paymentProvider: "QWRUBnoFees" | "CARDRUBNOFEES" | "YAMRUB" | "BTC" | "USDTTRC";

  @ApiProperty()
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  public email: string;

  @ApiProperty()
  @MinLength(5)
  @IsString()
  @IsNotEmpty()
  public purse: string;
}
