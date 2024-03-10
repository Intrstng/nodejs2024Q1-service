import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../db/db.service';
import { IArtist } from '../interfaces/interfaces';
import { CreateArtistDto } from './dto/create-artist.dto';
import { v4 as uuidv4 } from 'uuid';

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

  createArtist(dto: CreateArtistDto): IArtist {
    const newArtist: IArtist = {
      ...dto,
      id: uuidv4(),
    };
    this.db.artists.push(newArtist);
    return newArtist;
  }
}
