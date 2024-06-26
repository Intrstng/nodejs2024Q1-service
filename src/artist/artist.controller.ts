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
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @ApiBearerAuth()
  @HttpCode(200)
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @HttpCode(200)
  findArtistById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.artistService.findArtistById(id);
  }

  @Post()
  @ApiBearerAuth()
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
  @ApiBearerAuth()
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
  @ApiBearerAuth()
  @HttpCode(204)
  deleteArtistById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.artistService.deleteArtistById(id);
  }
}
