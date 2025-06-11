import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreatTaskDto } from './dto/creat-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { LoggerInterceptor } from 'src/common/interceptors/logger.inteceptor';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('/tarefa')
  @UseInterceptors(LoggerInterceptor)
  findAllTask(@Query() paginationDto: PaginationDto) {
    return this.taskService.findall(paginationDto);
  }

  @Get(':id')
  findOneTask(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Post()
  creatTask(@Body() creatTaskDto: CreatTaskDto) {
    return this.taskService.create(creatTaskDto);
  }

  // @Patch(':id')
  // updadtTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
  //   this.taskService.update(id, updateTaskDto);
  // }

  @Delete(':id')
  deleteTask(@Param('id', ParseIntPipe) id: number) {
    this.taskService.delete(id);
  }
}
