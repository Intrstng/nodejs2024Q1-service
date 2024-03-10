import { IAlbum } from '../../interfaces/interfaces';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateIf,
} from 'class-validator';

export class UpdateAlbumDto implements IAlbum {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name;

  @IsInt()
  @IsOptional()
  @Min(1)
  @IsNotEmpty()
  year;

  @IsUUID()
  @IsOptional()
  @ValidateIf((object, value) => value !== null)
  artistId;
}
