import { IsNotEmpty, IsString } from 'class-validator';
import { IUpdatePasswordDto } from '../../interfaces/interfaces';

export class UpdatePasswordDto implements IUpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  oldPassword;

  @IsString()
  @IsNotEmpty()
  newPassword;
}
