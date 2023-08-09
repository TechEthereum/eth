import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminUserService } from '../user/service';

@Injectable()
export class AdminAuthService {
  constructor(private usersService: AdminUserService, private jwtService: JwtService) {}

  async signIn(username, password) {
    const user = await this.usersService.findOne({ username });

    if (user?.password !== password) {
      throw new BadRequestException('账号或密码错误');
    }

    const payload = { username: user.username, sub: user.id };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
