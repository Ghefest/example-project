import { Allow, IsEmail, IsNotEmpty, IsOptional, IsString, Length, Max, MinLength } from "class-validator";

export class Create {
  @IsEmail()
  @MinLength(5)
  @IsString()
  @IsNotEmpty()
  public email: string;

  @Length(3, 30)
  @IsString()
  @IsNotEmpty()
  public subject: string;

  @Length(1, 255)
  @IsString()
  @IsNotEmpty()
  public message: string;

  @Allow()
  @IsOptional()
  public image?: any;
}
