import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

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