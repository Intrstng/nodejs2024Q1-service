import {Injectable, NotFoundException} from '@nestjs/common';
import { DatabaseService } from '../db/db.service';
import { IUser } from '../interfaces/interfaces';
import {CreateUserDto} from './dto/create-user.dto';
import {User} from '../entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

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

  findUserById(id: string): IUser | undefined {
    const user = this.db.users.find(u => u.id === id);
    if (user) {
      return slicePasswordFromResponseObject(user);
    }
    return user;
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
}
