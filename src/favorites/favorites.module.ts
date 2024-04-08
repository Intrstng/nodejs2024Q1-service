import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { DatabaseService } from '../db/db.service';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';

@Module({
  providers: [
    FavoritesService,
    DatabaseService,
    TrackService,
    AlbumService,
    ArtistService,
  ],
  controllers: [FavoritesController],
})
export class FavoritesModule {}
