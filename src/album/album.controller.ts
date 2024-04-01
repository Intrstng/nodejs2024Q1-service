import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @ApiBearerAuth()
  @HttpCode(200)
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @HttpCode(200)
  findAlbumById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.albumService.findAlbumById(id);
  }

  @Post()
  @ApiBearerAuth()
  @HttpCode(201)
  createAlbum(@Body() dto: CreateAlbumDto) {
    if (
      !dto ||
      typeof dto.name !== 'string' ||
      typeof dto.year !== 'number' ||
      (typeof dto.artistId !== 'string' && dto.artistId !== null)
    ) {
      throw new BadRequestException(
        'Request body does not contain required fields',
      );
    }
    return this.albumService.createAlbum(dto);
  }

  @Put(':id')
  @ApiBearerAuth()
  @HttpCode(200)
  updateAlbumById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdateAlbumDto,
  ) {
    if (
      (!dto?.name && !dto?.year && !dto?.artistId) ||
      (dto.name && typeof dto.name !== 'string') ||
      (dto.year && typeof dto.year !== 'number') ||
      (dto.artistId && typeof dto.artistId !== 'string')
    ) {
      throw new BadRequestException(
        'Request body does not contain required fields',
      );
    }
    return this.albumService.updateAlbumById(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @HttpCode(204)
  deleteAlbumById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.albumService.deleteAlbumById(id);
  }
}
