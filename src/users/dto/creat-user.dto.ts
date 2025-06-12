import { IsEmail, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class creatUserDto {
  @IsString()
  @Max(12)
  @IsNotEmpty()
  @Min(3)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Max(12)
  @IsNotEmpty()
  @Min(3)
  password: string;
}
