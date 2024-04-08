import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { FavoritesModule } from './favorites/favorites.module';
import { PrismaModule } from './prisma/prisma.module';
// import { LoggerMiddleware } from './middleware/logger.middleware';
// import { HttpExceptionFilter } from './middleware/exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
// import { LogModule } from './log/log.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavoritesModule,
    PrismaModule,
    AuthModule,
    // LogModule,
  ],
  // providers: [{
  //   provide: APP_FILTER,
  //   useClass: HttpExceptionFilter,
  // }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
