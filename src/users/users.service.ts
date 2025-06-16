import { UpdateUserDto } from './dto/update-user.dto';
import { CreatUserDto } from './dto/creat-user.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private pisma: PrismaService) {}
  async findOne(id: number) {
    const user = await this.pisma.user.findFirst({
      where: {
        id: id,
      },
      select: {
        name: true,
        id: true,
        email: true,
        Task: true,
      },
    });

    if (user) return user;
    throw new HttpException(
      'n foi possivel achar o  user',
      HttpStatus.BAD_REQUEST,
    );
  }

  async createUser(creatUserDto: CreatUserDto) {
    try {
      const user = await this.pisma.user.create({
        data: {
          name: creatUserDto.name,
          email: creatUserDto.email,
          passwordHash: creatUserDto.password,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
      return user;
    } catch (err) {
      console.log(err);

      throw new HttpException('erro ao criar o  user', HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.pisma.user.findFirst({
        where: {
          id: id,
        },
      });

      if (!user) {
        throw new HttpException('user n existe ', HttpStatus.BAD_REQUEST);
      }

      const updateUser = await this.pisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          name: updateUserDto.name ? updateUserDto.name : user.name,
          passwordHash: updateUserDto.password
            ? updateUserDto.password
            : user.passwordHash,
        },
        select: {
          name: true,
          email: true,
          id: true,
        },
      });

      return updateUser;
    } catch (err) {
      console.log(err);
      throw new HttpException('erro ao atualizar  ', HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: number) {
    try {
      const user = await this.pisma.user.findFirst({
        where: {
          id: id,
        },
      });

      if (!user) {
        throw new HttpException('user n existe ', HttpStatus.BAD_REQUEST);
      }

      await this.pisma.user.delete({
        where: {
          id: user.id,
        },
      });

      return {
        messsage: 'user deletado ',
      };
    } catch (err) {
      throw new HttpException('erro ao deletar ', HttpStatus.BAD_REQUEST);
    }
  }
}
