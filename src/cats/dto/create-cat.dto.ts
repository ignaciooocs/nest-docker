import { MinLength, IsString, IsInt, IsPositive, IsNotEmpty } from "class-validator";

export class CreateCatDto {

  @MinLength(3)
  @IsString()
  name: string;

  @IsInt()
  @IsPositive()
  age: number;

  @IsString()
  @IsNotEmpty()
  breed: string;
}
