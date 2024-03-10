import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../db/db.service';
import { Album } from '../entities/album.entity';
import { v4 as uuidv4 } from 'uuid';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(private readonly db: DatabaseService) {}

  findAll(): Album[] {
    return this.db.albums;
  }

  findAlbumById(id: string): Album {
    const album = this.db.albums.find((a) => a.id === id);
    if (!album) {
      throw new NotFoundException(`Album record with id ${id} not found`);
    }
    return album;
  }

  createAlbum(dto: any): Album {
    const newAlbum: Album = {
      id: uuidv4(),
      ...dto,
    };
    this.db.albums.push(newAlbum);
    return newAlbum;
  }

  updateAlbumById(id: string, dto: UpdateAlbumDto): Album {
    const album = this.db.albums.find((a) => a.id === id);
    if (!album) {
      throw new NotFoundException(`Album record with id ${id} not found`);
    }
    album.name = dto.name;
    album.year = dto.year;
    album.artistId = dto.artistId;
    return album;
  }

  deleteAlbumById(id: string): any {
    return {};
  }
}
