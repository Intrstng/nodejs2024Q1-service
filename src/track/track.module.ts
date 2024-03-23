import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { DatabaseService } from '../database/db.service';

@Module({
  providers: [TrackService, DatabaseService],
  controllers: [TrackController],
})
export class TrackModule {}
