import { ApiProperty } from '@nestjs/swagger';
import { ITokensObject } from '../interfaces/interfaces';

export class Auth implements ITokensObject {
  @ApiProperty()
  accessToken;
  refreshToken;
}