import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Post()
  addUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.addUser(createUserDto);
  }
}
