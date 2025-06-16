import { IsEmail, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreatUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
