import { ApiProperty } from '@nestjs/swagger';
import { IArtist } from '../interfaces/interfaces';

export class Artist implements IArtist {
  @ApiProperty({ type: 'string', format: 'uuid', nullable: true })
  id;

  @ApiProperty()
  name;

  @ApiProperty()
  grammy;
}
