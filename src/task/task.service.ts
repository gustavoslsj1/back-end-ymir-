import { findIndex } from 'rxjs';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreatTaskDto } from './dto/creat-task.dto';
import { Task } from './entities/task.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async findall(paginationDto?: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto || {};

    console.log(paginationDto);

    const allTasks = await this.prisma.task.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        created: 'desc',
      },
    });
    return allTasks;
  }

  async findOne(id: string) {
    const task = await this.prisma.task.findFirst({
      where: { id: Number(id) },
    });

    if (task?.name) return task;

    throw new HttpException('não foi possivel achar', HttpStatus.NOT_FOUND);
  }

  async create(creatTaskDto: CreatTaskDto) {
    const newtask = await this.prisma.task.create({
      data: {
        name: creatTaskDto.name,
        description: creatTaskDto.description,
        completed: false,
        userId: creatTaskDto.userId,
      },
    });

    return newtask;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    try {
      const taskIndex = await this.prisma.task.findFirst({
        where: {
          id: id,
        },
      });

      if (!taskIndex) {
        throw new HttpException(
          'não foi possivel achar ',
          HttpStatus.NOT_FOUND,
        );
      }

      const task = await this.prisma.task.update({
        where: {
          id: taskIndex.id,
        },
        data: updateTaskDto,
      });

      return task;
    } catch (err) {
      throw new HttpException(
        'não foi possivel achar ',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(id: number) {
    try {
      const findTask = await this.prisma.task.findFirst({
        where: {
          id: id,
        },
      });

      if (!findTask) {
        throw new HttpException(
          'não foi possivel achar ',
          HttpStatus.NOT_FOUND,
        );
      }
      await this.prisma.task.delete({
        where: {
          id: findTask.id,
        },
      });

      return 'tarefa deletada ';
    } catch (err) {
      throw new HttpException(
        'não foi possivel achar ',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
