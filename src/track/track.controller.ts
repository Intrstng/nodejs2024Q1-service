import { BadRequestException, Body, Controller, Get, HttpCode, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';

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
}
