import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from '../database/db.service';
import { IUser } from '../interfaces/interfaces';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

function slicePasswordFromResponseObject(obj: IUser): IUser {
  const { password, ...rest } = obj;
  return rest;
}

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll(): Promise<IUser[]> {
    const users = await this.prisma.user.findMany();
    return users.map((u) => slicePasswordFromResponseObject(u));
  }

  async findUserById(id: string): Promise<IUser> {
    const user = await this.prisma.user.findFirst({ where: { id: id } })
    if (user) {
      return slicePasswordFromResponseObject(user);
    } else {
      throw new NotFoundException(`User record with id ${id} not found`);
    }
  }

  async createUser(dto: CreateUserDto): Promise<IUser> {
    const newUser: User = {
      ...dto,
      id: uuidv4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const user = await this.prisma.user.create({
      data: newUser,
    });
    return slicePasswordFromResponseObject(user);
  }

  async updateUsersPasswordById(id: string, dto: UpdatePasswordDto): Promise<IUser> {
    const user = await this.prisma.user.findFirst({ where: { id: id } });
    if (user) {
      if (user.password !== dto.oldPassword) {
        throw new ForbiddenException(
          `Old password is wrong for user with id ${id}`,
        );
      }
      user.password = dto.newPassword;
      user.version += 1;
      user.updatedAt = Date.now();
      const updatedUser = await this.prisma.user.update({
        where: {
          id: id,
        },
        data: user,
      });
      return slicePasswordFromResponseObject(updatedUser); // user
    } else {
      throw new NotFoundException(`User record with id ${id} not found`);
    }
  }

  async deleteUserById(id: string) {
    const idxUser = await this.prisma.user.findFirst({ where: { id: id } });
    if (!idxUser) {
      throw new NotFoundException(`User record with id ${id} not found`);
    }
    return await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
