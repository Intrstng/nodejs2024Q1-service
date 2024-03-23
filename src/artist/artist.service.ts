import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/db.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateArtistDto } from './dto/update-user.dto';
import { Artist } from '../entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(private readonly db: DatabaseService) {}

  findAll(): Artist[] {
    return this.db.artists;
  }

  findArtistById(id: string): Artist {
    const artist = this.db.artists.find((a) => a.id === id);
    if (!artist) {
      throw new NotFoundException(`Artist record with id ${id} not found`);
    }
    return artist;
  }

  createArtist(dto: CreateArtistDto): Artist {
    const newArtist: Artist = {
      ...dto,
      id: uuidv4(),
    };
    this.db.artists.push(newArtist);
    return newArtist;
  }

  updateArtistById(id: string, dto: UpdateArtistDto): Artist {
    const artist = this.db.artists.find((a) => a.id === id);
    if (!artist) {
      throw new NotFoundException(`Artist record with id ${id} not found`);
    }
    artist.name = dto.name;
    artist.grammy = dto.grammy;
    return artist;
  }

  deleteArtistById(id: string): void {
    const idxArtist = this.db.artists.findIndex((a) => a.id === id);
    if (idxArtist === -1) {
      throw new NotFoundException(`Artist record with id ${id} not found`);
    }
    this.db.artists.splice(idxArtist, 1);
    this.db.albums.forEach((a) => {
      a.artistId === id && (a.artistId = null);
    });
    this.db.tracks.forEach((t) => {
      t.artistId === id && (t.artistId = null);
    });
    // Favorites
    const idxFavoriteArtist = this.db.favorites.artists.findIndex(
      (a) => a.id === id,
    );
    if (idxFavoriteArtist !== -1) {
      this.db.favorites.artists.splice(idxFavoriteArtist, 1);
    }
  }
}
