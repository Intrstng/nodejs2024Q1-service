import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { IS_PUBLIC_KEY } from './decorator/decorator';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(req);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_KEY,
      });
    } catch {
      if (req.url === '/auth/refresh') {
        try {
          await this.jwtService.verifyAsync(token, {
            secret: process.env.JWT_KEY,
            ignoreExpiration: true,
          });
        } catch {
          throw new UnauthorizedException();
        }
      } else {
        throw new UnauthorizedException();
      }
    }
    return true;
  }
}
