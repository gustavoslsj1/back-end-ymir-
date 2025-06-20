import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SingInDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
