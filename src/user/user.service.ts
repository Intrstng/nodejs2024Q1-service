import {Injectable, NotFoundException} from '@nestjs/common';
import { DatabaseService } from '../db/db.service';
import { User } from '../interfaces/interfaces';

function slicePasswordFromResponseObject(obj: User): User {
  const { password, ...rest } = obj;
  return rest;
}

@Injectable()
export class UserService {
  constructor(private readonly db: DatabaseService) {}
  findAll() {
    return this.db.users;
  }

  findUserById(id: string) {
    const user = this.db.users.find(u => u.id === id);
    if (user) {
      return slicePasswordFromResponseObject(user);
    }
    return user;
  }
}
