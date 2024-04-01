import { Artist } from './artist.entity';
import { Album } from './album.entity';
import { Track } from './track.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IFavoritesResponse } from '../interfaces/interfaces';

export class Favorite implements IFavoritesResponse {
  @ApiProperty({ type: [Artist] })
  artists;

  @ApiProperty({ type: [Album] })
  albums;

  @ApiProperty({ type: [Track] })
  tracks;
}
