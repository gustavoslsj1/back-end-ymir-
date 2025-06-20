import { PrismaService } from 'src/prisma/prisma.service';
import { SingInDto } from './dto/singin.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HashingServiceProtocol } from './hash/hashing.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private hash: HashingServiceProtocol,
  ) {}
  async authenticated(singInDto: SingInDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: singInDto.email,
      },
    });

    if (!user) {
      throw new HttpException('erro ao logar ', HttpStatus.BAD_REQUEST);
    }

    const passwordisValid = await this.hash.compare(
      singInDto.password,
      user.passwordHash,
    );

    if (!passwordisValid) {
      throw new HttpException('erro ao logar ', HttpStatus.BAD_REQUEST);
    }
    return { id: user.id, email: user.email, name: user.name };
  }
}
