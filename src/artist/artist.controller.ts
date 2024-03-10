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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-user.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @HttpCode(200)
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  getArtistById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.artistService.getArtistById(id);
  }

  @Post()
  @HttpCode(201)
  createArtist(@Body() dto: CreateArtistDto) {
    if (!(dto?.name && dto?.grammy)) {
      throw new BadRequestException(
        'Request body does not contain required fields',
      );
    }
    return this.artistService.createArtist(dto);
  }

  @Put(':id')
  @HttpCode(200)
  updateArtistById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdateArtistDto,
  ) {
    if (
      (!dto?.name && !dto?.grammy) ||
      (dto?.name && typeof dto?.name !== 'string') ||
      (dto?.grammy && typeof dto?.grammy !== 'boolean')
    ) {
      throw new BadRequestException(
        'Request body does not contain required fields',
      );
    }
    return this.artistService.updateArtistById(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteArtistById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.artistService.deleteArtistById(id);
  }
}
