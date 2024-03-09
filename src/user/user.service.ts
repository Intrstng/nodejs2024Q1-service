import {ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import { DatabaseService } from '../db/db.service';
import { IUser } from '../interfaces/interfaces';
import {CreateUserDto} from './dto/create-user.dto';
import {User} from '../entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import {UpdatePasswordDto} from './dto/update-user.dto';

function slicePasswordFromResponseObject(obj: IUser): IUser {
  const { password, ...rest } = obj;
  return rest;
}

@Injectable()
export class UserService {
  constructor(private readonly db: DatabaseService) {}
  findAll(): IUser[] {
    return this.db.users.map(u => slicePasswordFromResponseObject(u));
  }

  findUserById(id: string): IUser {
    const user = this.db.users.find(u => u.id === id);
    if (user) {
      return slicePasswordFromResponseObject(user);
    } else {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  createUser(dto: CreateUserDto): IUser {
    const newUser: User = {
      ...dto,
      id: uuidv4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.db.users.push(newUser);
    return slicePasswordFromResponseObject(newUser);
  }

  updateUsersPasswordById(id: string, dto: UpdatePasswordDto): IUser | undefined {
    let user = this.db.users.find(u => u.id === id);
    if (user) {
      if (user.password !== dto.oldPassword) {
        throw new ForbiddenException(
            `Old password is wrong for user with id ${id}`,
        );
      }
      user.password = dto.newPassword;
      user.version += 1;
      user.updatedAt = Date.now();
      return slicePasswordFromResponseObject(user);
    } else {
      throw new NotFoundException(`User record with id ${id} not found`);
    }
  }
}
