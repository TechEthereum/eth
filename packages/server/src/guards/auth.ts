import { AUTH_GUARD_KEY, AuthGuardType, IS_PUBLIC_KEY } from '@/decorators';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private configService?: ConfigService, private jwtService?: JwtService, private reflector?: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const authGuardType = this.reflector.getAllAndOverride<AuthGuardType>(AUTH_GUARD_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      // 💡 See this condition
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const secretMap = {
        [AuthGuardType.ADMIN]: this.configService.get('server.jwt.admin.secret'),
        [AuthGuardType.APP]: this.configService.get('server.jwt.app.secret'),
      };

      const secret = secretMap[authGuardType];
      const payload = await this.jwtService.verifyAsync(token, { secret });

      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['requestSender'] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
