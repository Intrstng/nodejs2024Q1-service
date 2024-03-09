import {BadRequestException, Controller, Get, NotFoundException, Param, ParseUUIDPipe} from '@nestjs/common';
import { UserService } from './user.service';
import {validate} from 'uuid';

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
}
