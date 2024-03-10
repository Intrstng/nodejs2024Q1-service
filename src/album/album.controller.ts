import { Controller, Get, HttpCode } from '@nestjs/common';
import { AlbumService } from './album.service';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @HttpCode(200)
  findAll() {
    return this.albumService.findAll();
  }
}
