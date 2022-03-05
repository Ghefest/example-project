import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, Max, Min } from "class-validator";

export class UpdateItemBuyMaxPrice {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  public itemBuyMaxPrice: number;
}

export class UpdateItemBuyMinPrice {
  @ApiProperty()
  @Min(0)
  @IsNumber()
  @IsNotEmpty()
  public itemBuyMinPrice: number;
}

export class UpdatePriceFormulaX {
  @ApiProperty()
  @Max(10)
  @IsNumber()
  @IsNotEmpty()
  public priceFormulaX: number;
}

export class UpdateIsSalesEnabled {
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  public isSalesEnabled: boolean;
}

export class UpdateMinWithdrawSum {
  @ApiProperty()
  @Min(0)
  @IsNumber()
  @IsNotEmpty()
  public minWithdrawSum: number;
}
