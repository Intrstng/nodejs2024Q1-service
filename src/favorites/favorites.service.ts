import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';
import { ArtistService } from '../artist/artist.service';
import { DatabaseService } from '../db/db.service';
import { ITrack } from '../interfaces/interfaces';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
    private readonly db: DatabaseService,
  ) {}

  findAll() {
    return this.db.favorites;
  }

  addTrack(id: string): ITrack {
    const track = this.trackService.findTrackById(id);
    if (!track) {
      throw new UnprocessableEntityException({
        message: `Track record with id ${id} doesn't exist`,
      });
    }
    this.db.favorites.tracks.push(track);
    return track;
  }
}
