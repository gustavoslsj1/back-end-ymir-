import { UpdateUserDto } from './dto/update-user.dto';
import { CreatUserDto } from './dto/creat-user.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { HashingServiceProtocol } from 'src/auth/hash/hashing.service';

@Injectable()
export class UsersService {
  constructor(
    private pisma: PrismaService,
    private readonly hashingService: HashingServiceProtocol,
  ) {}
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

  async create(creatUserDto: CreatUserDto) {
    try {
      const passwordHash = await this.hashingService.hash(
        creatUserDto.password,
      );
      const user = await this.pisma.user.create({
        data: {
          name: creatUserDto.name,
          email: creatUserDto.email,
          passwordHash: passwordHash,
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
      const dataUser: { name?: string; passwordHash?: string } = {
        name: updateUserDto.name ? updateUserDto.name : user.name,
      };

      if (updateUserDto?.password) {
        const passwordHash = await this.hashingService.hash(
          updateUserDto?.password,
        );
        dataUser['passwordHash'] = passwordHash;
      }
      const updateUser = await this.pisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          name: dataUser.name,
          passwordHash: dataUser?.passwordHash
            ? dataUser?.passwordHash
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
