import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { IUserResponseInterface } from './types/userResponse.interface';
import { LoginUserDto } from './dto/login.dto';
import { Request } from 'express';
import { IExpressRequestInterface } from '@app/types/expressExpress.interface';
import { User } from './decorators/user.decorator';
import { UserEntity } from './user.entity';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<IUserResponseInterface> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Post('users/login')
  @UsePipes(new ValidationPipe())
  async login(
    @Body('user') loginUserDto: LoginUserDto,
  ): Promise<IUserResponseInterface> {
    const user = await this.userService.login(loginUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Get('user')
  async currentUser(
    @User() user: UserEntity,
    @User('id') currentUserId: number,
  ): Promise<IUserResponseInterface> {
    console.log(currentUserId);
    return this.userService.buildUserResponse(user);
  }
}
