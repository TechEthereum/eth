import { BaseEntityWithAudit } from '@/entities/common';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuditMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    // // 获取当前用户信息，例如从请求头或身份验证中
    // const currentUser = req.user;

    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      try {
        const currentUser = this.jwtService.decode(token) as BaseEntityWithAudit;

        // // 记录幂等性操作
        // if (['POST', 'PATCH', 'PUT', 'DELETE'].includes(req.method)) {
        //   this.logger.info({
        //     time,
        //     method,
        //     originalUrl,
        //     username: user?.username,
        //     body: req.body,
        //   });
        // }
      } catch (error) {
        console.log('Error decoding user token:', error.message);
      }
    }

    next();
  }
}
