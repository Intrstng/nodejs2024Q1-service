import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../db/db.service';

@Injectable()
export class UserService {
  constructor(private readonly db: DatabaseService) {}
  findAll() {
    return this.db.users;
  }
}
