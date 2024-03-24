import { IArtist } from '../../interfaces/interfaces';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateArtistDto implements IArtist {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name;

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty()
  grammy;
}
