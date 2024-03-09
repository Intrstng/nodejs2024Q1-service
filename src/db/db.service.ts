import { Injectable } from '@nestjs/common';
// Data for testing:
// const user = {
//   "id": "e1451bcb-ed03-4d16-8f50-af15816e7337",
//   "login": "superuser",
//   "password": "password1234",
//   "version": 1,
//   "createdAt": 1655000000,
//   "updatedAt": 1655000051
// }
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
