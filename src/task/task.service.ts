import { UpdateTaskDto } from './dto/update-task.dto';
import { CreatTaskDto } from './dto/creat-task.dto';
import { Task } from './entities/task.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class TaskService {
  private tasks: Task[] = [
    {
      id: 1,
      name: 'primeiro',
      description: 'primeiro objeto ',
      completed: false,
    },
  ];

  findall() {
    return this.tasks;
  }

  findOne(id: string) {
    return this.tasks.find(task => task.id === Number(id));
  }

  create(creatTaskDto: CreatTaskDto) {
    const newId = this.tasks.length + 1;

    const newTask = {
      id: newId,
      ...creatTaskDto,
      completed: false,
    };

    this.tasks.push(newTask);

    return newTask;
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    const taskIndex = this.tasks.findIndex(task => task.id === Number(id));

    if (taskIndex >= 0) {
      const taskitem = this.tasks[taskIndex];
      this.tasks[taskIndex] = {
        ...taskitem,
        ...updateTaskDto,
      };
    }

    return 'tarefa atualizada';
  }

  delete(id: string) {
    const taskIndex = this.tasks.findIndex(task => task.id === Number(id));

    if (taskIndex <= 0) {
      throw new HttpException('nao encontrado', HttpStatus.NOT_FOUND);
    }

    this.tasks.splice(taskIndex, 1);

    return 'tarefa excluida com sucesso';
  }
}
