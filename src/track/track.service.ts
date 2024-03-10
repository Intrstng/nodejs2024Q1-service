import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../db/db.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from '../entities/track.entity';

@Injectable()
export class TrackService {
  constructor(private readonly db: DatabaseService) {}

  findAll(): Track[] {
    return this.db.tracks;
  }

  findTrackById(id: string): Track {
    const track = this.db.tracks.find((t) => t.id === id);
    if (!track) {
      throw new NotFoundException(`Track record with id ${id} not found`);
    } else return track;
  }

  createTrack(dto: CreateTrackDto): Track {
    const newTrack: Track = {
      id: uuidv4(),
      ...dto,
    };
    this.db.tracks.push(newTrack);
    return newTrack;
  }

  updateTrackById(id: string, dto: UpdateTrackDto): Track {
    const track = this.db.tracks.find((t) => t.id === id);
    if (!track) {
      throw new NotFoundException(`Track record with id ${id} not found`);
    }
    track.name = dto.name;
    track.albumId = dto.albumId;
    track.artistId = dto.artistId;
    track.duration = dto.duration;
    return track;
  }

  deleteTrackById(id: string): void {
    const idxTrack = this.db.tracks.findIndex((t) => t.id === id);
    if (idxTrack === -1) {
      throw new NotFoundException(`Track record with id ${id} not found`);
    }
    this.db.tracks.splice(idxTrack, 1);

    const idxFavoriteTrack = this.db.favorites.tracks.findIndex(
      (t) => t.id === id,
    );
    if (idxFavoriteTrack !== -1) {
      this.db.favorites.tracks.splice(idxFavoriteTrack, 1);
    }
  }
}
