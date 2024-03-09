import { IsNotEmpty, IsString } from 'class-validator';
import {ICreateUserDto} from '../../interfaces/interfaces';

export class CreateUserDto implements ICreateUserDto {
    @IsString()
    @IsNotEmpty()
    login;

    @IsString()
    @IsNotEmpty()
    password;
}