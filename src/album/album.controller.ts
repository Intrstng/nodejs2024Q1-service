import { Controller, Get, HttpCode, Param, ParseUUIDPipe } from '@nestjs/common';
import { AlbumService } from './album.service';

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
    this.albumService.findAlbumById(id);
  }
}
