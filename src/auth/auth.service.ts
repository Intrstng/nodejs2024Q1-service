import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Auth } from '../entities/auth.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { IUser, ITokensObject } from 'src/interfaces/interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async setAndReturnTokens(user: IUser): Promise<ITokensObject> {
    const payload = {
      sub: user.id,
      username: user.login
    };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_KEY,
      expiresIn: process.env.TOKEN_EXPIRATION_TIME,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_KEY,
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
    });
    const salt = Number(process.env.SALT);
    const hashedRefreshToken = await bcrypt.hash(refreshToken, salt);
    await this.userService.updateRefreshTokenById(user.id, hashedRefreshToken);
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  public async login(dto): Promise<Auth> {
    const { login, password } = dto;
    const user = await this.userService.findUserByLogin(login);
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Entered password is invalid');
      }
      return await this.setAndReturnTokens(user);
    } else throw new NotFoundException('User record with login not found');
  }

  public async signup(dto) {
    return await this.userService.createUser(dto);
  }

  public async refreshToken(refreshToken: string) {
    const payload = this.jwtService.decode(refreshToken);
    if (!payload) {
      throw new ForbiddenException('Access forbidden: payload is empty');
    }
    const user = await this.userService.findUserById(payload.sub);
    if (user) {
      try {
        const secret = process.env.JWT_REFRESH_KEY;
        await this.jwtService.verifyAsync(refreshToken, { secret: secret });
      } catch (err) {
        throw new ForbiddenException('Access forbidden');
      }
      return user;
    } else throw new NotFoundException('User record with login not found');
  }
}