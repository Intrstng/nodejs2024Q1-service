import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [AlbumService],
  controllers: [AlbumController],
  exports: [AlbumService],
  imports: [PrismaModule],
})
export class AlbumModule {}
