import { IAlbum } from '../interfaces/interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class Album implements IAlbum {
  @ApiProperty({ type: 'string', format: 'uuid', nullable: true })
  id;

  @ApiProperty()
  name;

  @ApiProperty()
  year;

  @ApiProperty({ type: 'string', format: 'uuid', nullable: true })
  artistId;
}
