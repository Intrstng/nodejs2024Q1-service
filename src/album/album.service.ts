import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Album } from '../entities/album.entity';
import { v4 as uuidv4 } from 'uuid';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Album[]> {
    return await this.prisma.album.findMany();
  }

  async findAlbumById(id: string): Promise<Album> {
    const album = await this.prisma.album.findFirst({ where: { id: id } });
    if (!album) {
      throw new NotFoundException(`Album record with id ${id} not found`);
    }
    return album;
  }

  async createAlbum(dto: any): Promise<Album> {
    const newAlbum: Album = {
      id: uuidv4(),
      ...dto,
    };
    return await this.prisma.album.create({
      data: newAlbum,
    });
  }

  async updateAlbumById(id: string, dto: UpdateAlbumDto): Promise<Album> {
    const album = await this.prisma.album.findFirst({ where: { id: id } });
    if (!album) {
      throw new NotFoundException(`Album record with id ${id} not found`);
    }
    album.name = dto.name;
    album.year = dto.year;
    album.artistId = dto.artistId;

    return await this.prisma.album.update({
      where: {
        id: id,
      },
      data: album,
    });
  }

  async deleteAlbumById(id: string) {
    const album = await this.prisma.album.findFirst({ where: { id: id } });
    if (!album) {
      throw new NotFoundException(`Album record with id ${id} not found`);
    }
    await this.prisma.track.updateMany({
      where: {
        albumId: {
          equals: id,
        },
      },
      data: {
        albumId: null,
      },
    });

    return await this.prisma.album.delete({
      where: {
        id: id,
      },
    });
  }
}
