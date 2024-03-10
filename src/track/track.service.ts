import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../db/db.service';
import { ITrack } from '../interfaces/interfaces';

@Injectable()
export class TrackService {
  constructor(private readonly db: DatabaseService) {}

  findAll(): ITrack[] {
    return this.db.tracks;
  }

  findTrackById(id: string) {
    return {};
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
