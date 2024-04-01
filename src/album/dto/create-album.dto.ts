import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  Min,
  ValidateIf,
} from 'class-validator';
import { IAlbum } from '../../interfaces/interfaces';

export class CreateAlbumDto implements IAlbum {
  @IsString()
  @IsNotEmpty()
  name;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  year;

  @IsUUID()
  @ValidateIf((object, value) => value !== null)
  artistId;
}
