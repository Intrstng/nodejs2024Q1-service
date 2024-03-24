import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from '../entities/track.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Track[]> {
    return await this.prisma.track.findMany();
  }

  async findTrackById(id: string): Promise<Track> {
    const track = await this.prisma.track.findFirst({ where: { id: id } });
    if (!track) {
      throw new NotFoundException(`Track record with id ${id} not found`);
    } else return track;
  }

  async createTrack(dto: CreateTrackDto): Promise<Track> {
    const newTrack: Track = {
      id: uuidv4(),
      ...dto,
    };
    return await this.prisma.track.create({
      data: newTrack,
    });
  }

  async updateTrackById(id: string, dto: UpdateTrackDto): Promise<Track> {
    const track = await this.prisma.track.findFirst({ where: { id: id } });
    if (!track) {
      throw new NotFoundException(`Track record with id ${id} not found`);
    }
    track.name = dto.name;
    track.albumId = dto.albumId;
    track.artistId = dto.artistId;
    track.duration = dto.duration;

    return await this.prisma.track.update({
      where: {
        id: id,
      },
      data: track,
    });
  }

  async deleteTrackById(id: string) {
    const track = await this.prisma.track.findFirst({ where: { id: id } })
    if (!track) {
      throw new NotFoundException(`Track record with id ${id} not found`);
    }
    return await this.prisma.track.delete({
      where: {
        id: id,
      },
    });
  }
}
