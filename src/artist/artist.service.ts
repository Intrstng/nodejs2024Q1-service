import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../db/db.service';
import { IArtist } from '../interfaces/interfaces';

@Injectable()
export class ArtistService {
  constructor(private readonly db: DatabaseService) {}

  findAll(): IArtist[] {
    return this.db.artists;
  }

  findArtistById(id: string): IArtist {
    const artist = this.db.artists.find((a) => a.id === id);
    if (!artist) {
      throw new NotFoundException(`Artist record with id ${id} not found`);
    }
    return artist;
  }
}
