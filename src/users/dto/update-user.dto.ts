import { PartialType } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreatUserDto } from './creat-user.dto';

export class UpdateUserDto extends PartialType(CreatUserDto) {
  @IsOptional()
  @IsInt()
  phone: number;
  @IsString()
  @IsOptional()
  endereco: string;
}
