import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateIf,
} from 'class-validator';
import { ITrack } from '../../interfaces/interfaces';

export class CreateTrackDto implements ITrack {
  @IsString()
  @IsNotEmpty()
  name;

  @IsUUID()
  @IsOptional()
  @ValidateIf((object, value) => value !== null)
  artistId;

  @IsUUID()
  @IsOptional()
  @ValidateIf((object, value) => value !== null)
  albumId;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  duration;
}
