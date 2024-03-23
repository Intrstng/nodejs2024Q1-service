import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { DatabaseService } from '../database/db.service';

@Module({
  providers: [AlbumService, DatabaseService],
  controllers: [AlbumController],
})
export class AlbumModule {}
