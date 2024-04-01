import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUser } from '../interfaces/interfaces';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

export const roundsOfHashing = 10;

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
    const user = await this.prisma.user.findFirst({ where: { id: id } });
    if (user) {
      return slicePasswordFromResponseObject(user);
    } else {
      throw new NotFoundException(`User record with id ${id} not found`);
    }
  }

  async createUser(dto: CreateUserDto): Promise<IUser> {
    const passHashed = await bcrypt.hash(dto.password, roundsOfHashing);
    const timestamp = Number(Date.now());
    const newUser: User = {
      ...dto,
      id: uuidv4(),
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
      password: passHashed,
    };
    const user = await this.prisma.user.create({
      data: newUser,
    });
    return slicePasswordFromResponseObject(user);
  }

  async updateUsersPasswordById( id: string, dto: UpdatePasswordDto ): Promise<IUser> {
    const user = await this.prisma.user.findFirst({ where: { id: id } });
    if (user) {
      const passwordIsValid = await bcrypt.compare(dto.oldPassword, user.password);
      if (!passwordIsValid) throw new ForbiddenException('Entered password is wrong');
      user.password = await bcrypt.hash(dto.newPassword, roundsOfHashing);
      user.version += 1;
      user.updatedAt = Date.now();
      const updatedUser = await this.prisma.user.update({
        where: {
          id: id,
        },
        data: user,
      });
      return slicePasswordFromResponseObject(updatedUser);
    } else {
      throw new NotFoundException(`User record with id ${id} not found`);
    }
  }

  async deleteUserById(id: string) {
    const user = await this.prisma.user.findFirst({ where: { id: id } });
    if (!user) {
      throw new NotFoundException(`User record with id ${id} not found`);
    }
    return await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
