import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../db/db.service';
import { ITrack } from '../interfaces/interfaces';

@Injectable()
export class TrackService {
  constructor(private readonly db: DatabaseService) {}

  findAll(): ITrack[] {
    return this.db.tracks;
  }

  findTrackById(id: string): ITrack {
    const track = this.db.tracks.find((t) => t.id === id);
    if (!track) {
      throw new NotFoundException(`Track record with id ${id} not found`);
    } else return track;
  }

  createTrack() {
    return {};
  }

  updateTrackById() {
    return {};
  }

  deleteTrackById() {
    return {};
  }
}
