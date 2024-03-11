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
    const index = this.db.tracks.findIndex((track) => track.id === id);
    if (index === -1) {
      throw new UnprocessableEntityException(
        `Track record with id ${id} doesn't exist`,
      );
    }
    const track = this.trackService.findTrackById(id);
    if (track) {
      this.db.favorites.tracks.push(track);
      return track;
    }
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
    const index = this.db.albums.findIndex((album) => album.id === id);
    if (index === -1) {
      throw new UnprocessableEntityException(
        `Album record with id ${id} doesn't exist`,
      );
    }
    const album = this.albumService.findAlbumById(id);
    if (album) {
      this.db.favorites.albums.push(album);
      return album;
    }
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
    const index = this.db.artists.findIndex((artist) => artist.id === id);
    if (index === -1) {
      throw new UnprocessableEntityException(
        `Artist record with id ${id} doesn't exist`,
      );
    }
    const artist = this.artistService.findArtistById(id);
    if (artist) {
      this.db.favorites.artists.push(artist);
      return artist;
    }
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