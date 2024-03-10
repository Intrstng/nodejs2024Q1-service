import { Controller, Get, HttpCode, Param, ParseUUIDPipe } from '@nestjs/common';
import { ArtistService } from './artist.service';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @HttpCode(200)
  findAll() {
    return this.artistService.findAll();
  }
}
