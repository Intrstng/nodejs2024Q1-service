import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ type: 'string', format: 'uuid', nullable: true })
  id: string;

  @ApiProperty()
  login: string;

  password: string;

  @ApiProperty()
  version: number;

  @ApiProperty()
  createdAt: number;

  @ApiProperty()
  updatedAt: number;
}