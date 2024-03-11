import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';
import { ArtistService } from '../artist/artist.service';
import { DatabaseService } from '../db/db.service';
import { Artist } from '../entities/artist.entity';
import { Album } from '../entities/album.entity';
import { Track } from '../entities/track.entity';

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

  addTrack(id: string): Track {
    const track = this.trackService.findTrackById(id);
    if (!track) {
      throw new UnprocessableEntityException({
        message: `Track record with id ${id} doesn't exist`,
      });
    }
    this.db.favorites.tracks.push(track);
    return track;
  }

  deleteTrack(id: string): void {
    const idxFavoriteTrack = this.db.favorites.tracks.findIndex(
      (t) => t.id === id,
    );
    if (idxFavoriteTrack === -1) {
      throw new NotFoundException(
        `Track record with id ${id} is not in favorites`,
      );
    }
    this.db.favorites.tracks.splice(idxFavoriteTrack, 1);
  }

  addAlbum(id: string): Album {
    const album = this.albumService.findAlbumById(id);
    if (!album) {
      throw new UnprocessableEntityException(
        `Album record with id ${id} doesn't exist`,
      );
    }
    this.db.favorites.albums.push(album);
    return album;
  }

  deleteAlbum(id: string): void {
    const idxAlbum = this.db.favorites.albums.findIndex((a) => a.id === id);
    if (idxAlbum === -1) {
      throw new NotFoundException(
        `Album record with id ${id} is not in favorites`,
      );
    }
    this.db.favorites.albums.splice(idxAlbum, 1);
  }

  addArtist(id: string): Artist {
    const artist = this.artistService.findArtistById(id);
    if (!artist) {
      throw new UnprocessableEntityException({
        message: `Artist record with id ${id} doesn't exist`,
      });
    }
    this.db.favorites.artists.push(artist);
    return artist;
  }

  deleteArtist(id: string): void {
    const idxArtist = this.db.favorites.artists.findIndex((a) => a.id === id);
    if (idxArtist === -1) {
      throw new NotFoundException(
        `Artist record with id ${id} is not in favorites`,
      );
    }
    this.db.favorites.artists.splice(idxArtist, 1);
  }
}
