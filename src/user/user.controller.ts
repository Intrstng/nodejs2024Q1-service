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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiBearerAuth()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @HttpCode(200)
  findUserById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.userService.findUserById(id);
  }

  @Post()
  @ApiBearerAuth()
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
  @ApiBearerAuth()
  @HttpCode(200)
  updateUserById(
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
  @ApiBearerAuth()
  @HttpCode(204)
  deleteUserById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.userService.deleteUserById(id);
  }
}
