import { AuthService } from './auth.service';

import { Body, Controller, Post } from '@nestjs/common';
import { SingInDto } from './dto/singin.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private prisma: PrismaService,
  ) {}

  @Post()
  singin(@Body() singInDto: SingInDto) {
    return this.authService.authenticated(singInDto);
  }
}
