import {
  Controller,
  Get,
  Post,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Delete,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @HttpCode(200)
  @ApiBearerAuth()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  @ApiBearerAuth()
  @HttpCode(201)
  addTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.addTrack(id);
  }

  @Delete('track/:id')
  @ApiBearerAuth()
  @HttpCode(204)
  deleteTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.deleteTrack(id);
  }

  @Post('album/:id')
  @ApiBearerAuth()
  @HttpCode(201)
  addAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.addAlbum(id);
  }

  @Delete('album/:id')
  @ApiBearerAuth()
  @HttpCode(204)
  deleteAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.deleteAlbum(id);
  }

  @Post('artist/:id')
  @ApiBearerAuth()
  @HttpCode(201)
  addArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.addArtist(id);
  }

  @Delete('artist/:id')
  @ApiBearerAuth()
  @HttpCode(204)
  deleteArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.deleteArtist(id);
  }
}
