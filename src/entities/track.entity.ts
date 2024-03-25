import { ApiProperty } from '@nestjs/swagger';
import { ITrack } from '../interfaces/interfaces';

export class Track implements ITrack {
  @ApiProperty({ type: 'string', format: 'uuid', nullable: true })
  id;

  @ApiProperty()
  name;

  @ApiProperty({ type: 'string', format: 'uuid', nullable: true })
  artistId;

  @ApiProperty({ type: 'string', format: 'uuid', nullable: true })
  albumId;

  @ApiProperty()
  duration;
}
