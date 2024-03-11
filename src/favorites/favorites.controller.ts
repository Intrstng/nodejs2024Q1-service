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

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @HttpCode(200)
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  //@HttpCode(201)
  addTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.addTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  deleteTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.deleteTrack(id);
  }

  @Post('album/:id')
  //@HttpCode(201)
  addAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.addAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  deleteAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.deleteAlbum(id);
  }

  @Post('artist/:id')
  //@HttpCode(201)
  addArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  deleteArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.deleteArtist(id);
  }
}









//
// import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
// import { FavoritesService } from './favorites.service';
//
// @Controller('favs')
// export class FavoritesController {
//   constructor(private readonly FavoritesService: FavoritesService) {}
//
//   @Get()
//   getAll() {
//     return this.FavoritesService.getAll();
//   }
//
//   @Post('album/:id')
//   @HttpCode(201)
//   addAlbum(@Param('id') id: string) {
//     return this.FavoritesService.addAlbum(id);
//   }
//
//   @Post('track/:id')
//   @HttpCode(201)
//   addTrack(@Param('id') id: string) {
//     return this.FavoritesService.addTrack(id);
//   }
//
//   @Post('artist/:id')
//   @HttpCode(201)
//   addArtist(@Param('id') id: string) {
//     return this.FavoritesService.addArtist(id);
//   }
//
//   @Delete('track/:id')
//   @HttpCode(204)
//   deleteTrack(@Param('id') id: string) {
//     return this.FavoritesService.deleteTrack(id);
//   }
//
//   @Delete('album/:id')
//   @HttpCode(204)
//   deleteAlbum(@Param('id') id: string) {
//     return this.FavoritesService.deleteAlbum(id);
//   }
//
//   @Delete('artist/:id')
//   @HttpCode(204)
//   deleteArtist(@Param('id') id: string) {
//     return this.FavoritesService.deleteArtist(id);
//   }
// }