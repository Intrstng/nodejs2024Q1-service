import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../db/db.service';
import { ITrack } from '../interfaces/interfaces';
import { CreateTrackDto } from './dto/create-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateTrackDto } from './dto/update-track.dto';

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

  createTrack(dto: CreateTrackDto): ITrack {
    const newTrack: ITrack = {
      id: uuidv4(),
      ...dto,
    };
    this.db.tracks.push(newTrack);
    return newTrack;
  }

  updateTrackById(id: string, dto: UpdateTrackDto) {
    const track = this.db.tracks.find((t) => t.id === id);
    if (track) {
      track.name = dto.name;
      track.albumId = dto.albumId;
      track.artistId = dto.artistId;
      track.duration = dto.duration;
    } else {
      throw new NotFoundException(`Track record with id ${id} not found`);
    }
    return track;
  }

  deleteTrackById() {
    return {};
  }
}
