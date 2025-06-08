import { IsString, MinLength } from 'class-validator';

export class CreatTaskDto {
  @IsString({ message: 'o nome precisa ser um texto' })
  @MinLength(5, { message: ' o nome precisa ter no minimo 5 letras' })
  name: string;
  description: string;
}
