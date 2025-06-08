import { PartialType } from '@nestjs/mapped-types';
import { CreatTaskDto } from './creat-task.dto';
import { IsBoolean, IsOptional } from 'class-validator';

// export class UpdateTaskDto {
//   name?: string;
//   description?: string;
//   completed?: boolean;
// }

export class UpdateTaskDto extends PartialType(CreatTaskDto) {
  @IsBoolean()
  @IsOptional()
  readonly completed?: boolean;
}
