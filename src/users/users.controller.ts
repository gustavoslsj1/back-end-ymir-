import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreatUserDto } from './dto/creat-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthTokenGuard } from 'src/auth/guard/auth-token.guard';
import { Response as ExpressResponse } from 'express';

import { TokenPayloadParam } from 'src/auth/param/token.param-payload';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';

@Controller('users')
export class UsersController {
  jwtService: any;
  constructor(private readonly userService: UsersService) {}
  @Get(':id')
  findOneUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreatUserDto) {
    return this.userService.create(createUserDto);
  }
  @UseGuards(AuthTokenGuard)
  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @TokenPayloadParam() tokenPayloadParam: TokenPayloadDto,
  ) {
    console.log('payload recebido:', tokenPayloadParam);
    return this.userService.update(id, updateUserDto, tokenPayloadParam);
  }
  @UseGuards(AuthTokenGuard)
  @Delete(':id')
  deleteUser(
    @Param('id', ParseIntPipe) id: number,
    @TokenPayloadParam() tokenPayloadParam: TokenPayloadDto,
  ) {
    return this.userService.delete(id, tokenPayloadParam);
  }
}
