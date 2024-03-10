import {
  Controller,
  Get,
  Post,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Body, BadRequestException,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @HttpCode(200)
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findAlbumById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.albumService.findAlbumById(id);
  }

  @Post()
  @HttpCode(201)
  createAlbum(@Body() dto: CreateAlbumDto) {
    if (!dto || typeof dto.name !== 'string' || typeof dto.year !== 'number') {
      throw new BadRequestException('invalid dto');
    }

    if (typeof dto.artistId !== 'string' && dto.artistId !== null) {
      throw new BadRequestException('invalid dto');
    }
    return this.albumService.createAlbum(dto);
  }
}
