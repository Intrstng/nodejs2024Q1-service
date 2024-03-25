import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const favorites = await this.prisma.favorites.findFirst();
    if (!favorites) {
      return {
        artists: [],
        albums: [],
        tracks: [],
      };
    }

    const tracks = await Promise.all(
      favorites.tracks.map(async (id) => {
        const trackObj = await this.prisma.track.findFirst({
          where: { id: id },
        });
        return {
          albumId: trackObj?.albumId,
          artistId: trackObj?.artistId,
          id: trackObj?.id,
          name: trackObj?.name,
          duration: trackObj?.duration,
        };
      }),
    );

    const albums = await Promise.all(
      favorites.albums.map(async (id) => {
        const albumObj = await this.prisma.album.findFirst({
          where: { id: id },
        });
        return {
          artistId: albumObj?.artistId,
          id: albumObj?.id,
          name: albumObj?.name,
          year: albumObj?.year,
        };
      }),
    );

    const artists = await Promise.all(
      favorites.artists.map(async (id) => {
        const artistObj = await this.prisma.artist.findFirst({
          where: { id: id },
        });
        return {
          id: artistObj?.id,
          name: artistObj?.name,
          grammy: artistObj?.grammy,
        };
      }),
    );

    return {
      tracks: tracks,
      albums: albums,
      artists: artists,
    };
  }

  async addTrack(id: string) {
    const track = await this.prisma.track.findFirst({ where: { id: id } });
    if (!track) {
      throw new UnprocessableEntityException(
        `Track record with id ${id} doesn't exist`,
      );
    }
    const favoriteTrack = await this.prisma.favorites.findFirst();
    const favObj = {
      favoritesId: uuidv4(),
      albums: [],
      artists: [],
      tracks: [],
    };
    if (!favoriteTrack) await this.prisma.favorites.create({ data: favObj });

    const favId = favoriteTrack
      ? favoriteTrack.favoritesId
      : favObj.favoritesId;

    const tracks = favoriteTrack?.tracks || [];
    tracks.push(track.id);

    await this.prisma.favorites.update({
      where: {
        favoritesId: favId,
      },
      data: {
        ...favoriteTrack,
        tracks: tracks,
      },
    });
  }

  async deleteTrack(id: string) {
    const favorites = await this.prisma.favorites.findFirst();
    if (favorites.tracks.findIndex((t) => t === id) === -1) {
      throw new NotFoundException(
        `Track record with id ${id} is not in favorites`,
      );
    }
    const newTracks = favorites?.tracks.filter((track) => track !== id);

    return await this.prisma.favorites.update({
      where: { favoritesId: favorites.favoritesId },
      data: {
        ...favorites,
        tracks: newTracks,
      },
    });
  }

  async addAlbum(id: string) {
    const album = await this.prisma.album.findFirst({ where: { id: id } });
    if (!album) {
      throw new UnprocessableEntityException(
        `Album record with id ${id} doesn't exist`,
      );
    }
    const data = await this.prisma.favorites.findFirst();
    const favObj = {
      favoritesId: uuidv4(),
      albums: [],
      artists: [],
      tracks: [],
    };

    if (!data) {
      await this.prisma.favorites.create({
        data: favObj,
      });
    }
    const albums = data.albums;
    albums.push(album.id);
    await this.prisma.favorites.update({
      where: { favoritesId: data.favoritesId },
      data: {
        ...data,
        albums: albums,
      },
    });
  }

  async deleteAlbum(id: string) {
    const favorites = await this.prisma.favorites.findFirst();
    const newAlbums = favorites?.albums.filter((a) => a !== id);

    await this.prisma.favorites.update({
      where: { favoritesId: favorites.favoritesId },
      data: {
        ...favorites,
        albums: newAlbums,
      },
    });
  }

  async addArtist(id: string) {
    const artist = await this.prisma.artist.findFirst({ where: { id: id } });
    if (!artist) {
      throw new UnprocessableEntityException(
        `Artist record with id ${id} doesn't exist`,
      );
    }
    const favorites = await this.prisma.favorites.findFirst();
    if (!favorites) {
      const favObj = {
        favoritesId: uuidv4(),
        albums: [],
        artists: [],
        tracks: [],
      };
      favObj.artists.push(artist.id);
      await this.prisma.favorites.create({ data: favObj });
    }
    const favoriteArtist = favorites.artists;
    favoriteArtist.push(id);
    const newData = {
      ...favorites,
      artists: favoriteArtist,
    };
    return await this.prisma.favorites.update({
      where: { favoritesId: favorites.favoritesId },
      data: newData,
    });
  }

  async deleteArtist(id: string) {
    const favorites = await this.prisma.favorites.findFirst();
    const newArtists = favorites?.artists.filter((a) => a !== id);
    return await this.prisma.favorites.update({
      where: { favoritesId: favorites.favoritesId },
      data: {
        ...favorites,
        artists: newArtists,
      },
    });
  }
}
