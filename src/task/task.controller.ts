import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreatTaskDto } from './dto/creat-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('/tarefa')
  findAllTask() {
    return this.taskService.findall();
  }

  @Get(':id')
  findOneTask(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Post()
  creatTask(@Body() creatTaskDto: CreatTaskDto) {
    return this.taskService.create(creatTaskDto);
  }

  @Patch(':id')
  updadtTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    this.taskService.delete(id);
  }
}
