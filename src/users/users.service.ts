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
    });

    if (user) return user;
    throw new HttpException(
      'n foi possivel achar o  user',
      HttpStatus.BAD_REQUEST,
    );
  }

  async createUser(){
    
  }
}
