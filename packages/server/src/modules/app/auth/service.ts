import { AdminUserService } from '@/modules/admin/user/service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppAuthService {
  constructor(
    private usersService: AdminUserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username, password) {
    const user = await this.usersService.findOne(username);

    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = { username: user.username, sub: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
