import { TokenPayloadParam } from './../auth/param/token.param-payload';
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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreatTaskDto } from './dto/creat-task.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

import { AuthTokenGuard } from 'src/auth/guard/auth-token.guard';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('/tarefa')
  findAllTask(@Query() paginationDto: PaginationDto) {
    return this.taskService.findall(paginationDto);
  }

  @Get(':id')
  findOneTask(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Post()
  @UseGuards(AuthTokenGuard)
  @ApiBearerAuth()
  creatTask(
    @Body() creatTaskDto: CreatTaskDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
  ) {
    return this.taskService.create(creatTaskDto, tokenPayload);
  }

  // @Patch(':id')
  // updadtTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
  //   this.taskService.update(id, updateTaskDto);
  // }

  @Delete(':id')
  @UseGuards(AuthTokenGuard)
  deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
  ) {
    this.taskService.delete(id, tokenPayload);
  }
}
