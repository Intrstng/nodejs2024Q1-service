import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../db/db.service';
import { IArtist } from '../interfaces/interfaces';

@Injectable()
export class ArtistService {
  constructor(private readonly db: DatabaseService) {}

  findAll(): IArtist[] {
    return this.db.artists;
  }
}
