import { ApiProperty } from '@nestjs/swagger';
import { IUser } from '../interfaces/interfaces';

export class User implements IUser {
  @ApiProperty({ type: 'string', format: 'uuid', nullable: true })
  id;

  @ApiProperty()
  login;

  password;

  @ApiProperty()
  version;

  @ApiProperty()
  createdAt;

  @ApiProperty()
  updatedAt;

  @ApiProperty()
  refreshToken?;
}
