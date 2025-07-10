import { PrismaService } from 'src/prisma/prisma.service';
import { SingInDto } from './dto/singin.dto';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { HashingServiceProtocol } from './hash/hashing.service';
import jwtConfig from './config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private hash: HashingServiceProtocol,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService,
  ) {}
  async authenticated(singInDto: SingInDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: singInDto.email,
        active: true,
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

    const token = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      {
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.jwtTtl,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      },
    );
    return { id: user.id, email: user.email, name: user.name, token: token };
  }
}
