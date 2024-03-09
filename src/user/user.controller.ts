import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findUserById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.userService.findUserById(id);
  }

  @Post()
  @HttpCode(201)
  createUser(@Body() dto: CreateUserDto) {
    if (!(dto.login && dto.password)) {
      throw new BadRequestException(
        'Request body does not contain required fields',
      );
    }
    return this.userService.createUser(dto);
  }

  @Put(':id')
  @HttpCode(200)
  updateUsersPasswordById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdatePasswordDto,
  ) {
    if (!(dto.oldPassword && dto.newPassword)) {
      throw new BadRequestException(
        'Request body does not contain required fields',
      );
    }
    return this.userService.updateUsersPasswordById(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUserById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.userService.deleteUserById(id);
  }
}
