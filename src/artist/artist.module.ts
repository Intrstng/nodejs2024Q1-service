import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { DatabaseService } from '../database/db.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, DatabaseService],
})
export class ArtistModule {}
