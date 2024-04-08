import { IArtist } from '../../interfaces/interfaces';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto implements IArtist {
  @IsString()
  @IsNotEmpty()
  name;

  @IsBoolean()
  @IsNotEmpty()
  grammy;
}
