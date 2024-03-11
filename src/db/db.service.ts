import { Injectable } from '@nestjs/common';

export const db = {
  users: [],
  artists: [],
  albums: [],
  tracks: [],
  favorites: {
    artists: [],
    albums: [],
    tracks: [],
  },
};

@Injectable()
export class DatabaseService {
  get users() {
    return db.users;
  }

  get artists() {
    return db.artists;
  }

  get tracks() {
    return db.tracks;
  }

  get albums() {
    return db.albums;
  }

  get favorites() {
    return db.favorites;
  }
}
