import { AuthService } from './auth.service';
import { Response } from 'express';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { SingInDto } from './dto/singin.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private prisma: PrismaService,
  ) {}

  @Post()
  async signin(
    @Body() signInDto: SingInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.authenticated(signInDto);
    res.cookie('auth', token, {
      httpOnly: false,
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24,
    });

    return { message: 'ok' };
  }
}
