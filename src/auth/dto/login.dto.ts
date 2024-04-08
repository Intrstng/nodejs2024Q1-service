import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ILoginDto } from '../../interfaces/interfaces';

export class LoginDto implements ILoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  login;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  password;
}
