import { IsString, MinLength, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatTaskDto {
  @IsString({ message: 'o nome precisa ser um texto' })
  @MinLength(5, { message: ' o nome precisa ter no minimo 5 letras' })
  readonly name: string;

  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  readonly userId: number;
}
