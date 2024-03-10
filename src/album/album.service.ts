import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../db/db.service';
import { Album } from '../entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(private readonly db: DatabaseService) {}

  findAll(): Album[] {
    return this.db.albums;
  }

  findAlbumById(id: string): any {
    return {};
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
