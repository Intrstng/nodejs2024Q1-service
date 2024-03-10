import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../db/db.service';
import { Album } from '../entities/album.entity';

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

  createAlbum(dto: any): any {
    return {};
  }

  updateAlbumById(id: string, dto: any): any {
    return {};
  }

  deleteAlbumById(id: string): any {
    return {};
  }
}
