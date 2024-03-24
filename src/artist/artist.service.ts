import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from '../entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Artist[]> {
    return await this.prisma.artist.findMany();
  }

  async findArtistById(id: string): Promise<Artist> {
    const artist = await this.prisma.artist.findFirst({ where: { id: id } });
    if (!artist) {
      throw new NotFoundException(`Artist record with id ${id} not found`);
    }
    return artist;
  }

  async createArtist(dto: CreateArtistDto): Promise<Artist> {
    const newArtist: Artist = {
      ...dto,
      id: uuidv4(),
    };
    return await this.prisma.artist.create({
      data: newArtist,
    });
  }

  async updateArtistById(id: string, dto: UpdateArtistDto): Promise<Artist> {
    const artist = await this.prisma.artist.findFirst({ where: { id: id } });
    if (!artist) {
      throw new NotFoundException(`Artist record with id ${id} not found`);
    }
    artist.name = dto.name;
    artist.grammy = dto.grammy;

    return await this.prisma.artist.update({
      where: {
        id: id,
      },
      data: artist,
    });
  }

  async deleteArtistById(id: string) {
    const artist = await this.prisma.artist.findFirst({ where: { id: id } });
    if (!artist) {
      throw new NotFoundException(`Artist record with id ${id} not found`);
    }
    await this.prisma.album.updateMany({
      where: {
        artistId: {
          equals: id,
        },
      },
      data: {
        artistId: null,
      },
    });

    await this.prisma.track.updateMany({
      where: {
        artistId: {
          equals: id,
        },
      },
      data: {
        artistId: null,
      },
    });

    return await this.prisma.artist.delete({
      where: {
        id: id,
      },
    });
  }
}
