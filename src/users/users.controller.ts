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
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreatUserDto } from './dto/creat-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthTokenGuard } from 'src/auth/guard/auth-token.guard';
import { REQUEST_TOKEN_PAYLOAD_NAME } from 'src/auth/common/auth.constants';
import { Request } from 'express';

@Controller('users')
export class UsersController {
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
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request,
  ) {
    console.log(req[REQUEST_TOKEN_PAYLOAD_NAME]);

    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
