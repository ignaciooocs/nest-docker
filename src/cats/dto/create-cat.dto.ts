import { MinLength, IsString, IsInt, IsPositive, IsOptional } from "class-validator";

export class CreateCatDto {

  @MinLength(3)
  @IsString()
  name: string;

  @IsInt()
  @IsPositive()
  age: number;

  @IsString()
  @IsOptional()
  breed: string;
}
