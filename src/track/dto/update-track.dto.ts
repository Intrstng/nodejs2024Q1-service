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

export class UpdateTrackDto implements ITrack {
  @IsString()
  @IsOptional()
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
  @IsOptional()
  @Min(1)
  @IsNotEmpty()
  duration;
}
