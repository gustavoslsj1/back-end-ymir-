import { TokenPayloadParam } from './../auth/param/token.param-payload';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreatUserDto } from './dto/creat-user.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { HashingServiceProtocol } from 'src/auth/hash/hashing.service';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt'; // se estiver usando JwtService

@Injectable()
export class UsersService {
  constructor(
    private pisma: PrismaService,
    private readonly hashingService: HashingServiceProtocol,
    private readonly jwtService: JwtService,
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

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    tokenPayload: TokenPayloadDto,
  ) {
    const user = await this.pisma.user.findFirst({ where: { id } });

    if (!user || user.id !== tokenPayload.sub) {
      throw new HttpException('user n existe', HttpStatus.BAD_REQUEST);
    }

    const dataUser: {
      name?: string;
      email: string;
      passwordHash?: string;
      phone?: string;
      endereco?: string;
    } = {
      name: updateUserDto.name ?? user.name,
      email: updateUserDto.email ?? user.email,
      phone: updateUserDto.phone ?? user.phone,
      endereco: updateUserDto.endereco ?? user.endereco,
    };
    console.log('Dados recebidos para update:', dataUser);
    if (updateUserDto.password) {
      dataUser.passwordHash = await this.hashingService.hash(
        updateUserDto.password,
      );
    }

    const updatedUser = await this.pisma.user.update({
      where: { id: user.id },
      data: {
        name: dataUser.name,
        email: dataUser.email,
        passwordHash: dataUser.passwordHash ?? user.passwordHash,
        phone: dataUser.phone,
        endereco: dataUser.endereco,
      },
      select: {
        name: true,
        email: true,
        phone: true,
        endereco: true,
        id: true,
      },
    });
    const tokenPayloadForJwt = {
      sub: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      endereco: updatedUser.endereco,
    };

    const newToken = this.jwtService.sign(tokenPayloadForJwt, {
      audience: 'http://localhost:3001',
    });
    return {
      user: updatedUser,
      token: newToken,
    };
  }

  async delete(id: number, TokenPayloadParam: TokenPayloadDto) {
    try {
      const user = await this.pisma.user.findFirst({
        where: {
          id: id,
        },
      });

      if (!user) {
        throw new HttpException('user n existe ', HttpStatus.BAD_REQUEST);
      }
      if (user.id != TokenPayloadParam.sub) {
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
