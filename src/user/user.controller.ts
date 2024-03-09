import {
  BadRequestException, Body,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post
} from '@nestjs/common';
import { UserService } from './user.service';
import {validate} from 'uuid';
import {CreateUserDto} from './dto/create-user.dto';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findUserById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    if (!validate(id)) throw new BadRequestException('invalid id');
    const user = this.userService.findUserById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  @Post()
  @HttpCode(201)
    createUser(@Body() dto: CreateUserDto) {
      if (!(dto.login && dto.password)) throw new BadRequestException('Request body does not contain required fields');
      return this.userService.createUser(dto);
  }
}
