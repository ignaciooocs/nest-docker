import { Transform } from "class-transformer";
import { IsEmail, IsString } from "class-validator";

export class SignInDto {

  @IsEmail()
  email: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  password: string;
}