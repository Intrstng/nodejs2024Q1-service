import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findTrackById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.trackService.findTrackById(id);
  }

  @Post()
  @HttpCode(201)
  createTrack(@Body() dto: CreateTrackDto) {
    if (!(dto?.name && dto?.duration)) {
      throw new BadRequestException(
        'Request body does not contain required fields',
      );
    }
    return this.trackService.createTrack(dto);
  }

  @Put(':id')
  @HttpCode(200)
  updateTrackById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdateTrackDto,
  ) {
    if (
      (!dto?.name && !dto?.duration && !dto?.artistId && !dto?.albumId) ||
      (dto?.name && typeof dto?.name !== 'string') ||
      (dto?.duration && typeof dto?.duration !== 'number') ||
      (dto?.artistId && typeof dto?.artistId !== 'string') ||
      (dto?.albumId && typeof dto?.albumId !== 'string')
    ) {
      throw new BadRequestException(
        'Request body does not contain required fields',
      );
    }
    return this.trackService.updateTrackById(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteTrackById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.trackService.deleteTrackById(id);
  }
}
