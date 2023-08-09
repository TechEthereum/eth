import { AdminGuard, Public } from '@/decorators';
import { Body, Controller, Post } from '@nestjs/common';
import { AdminAuthService } from './service';

@Controller('admin/auth')
@AdminGuard()
export class AdminAuthController {
  constructor(private authService: AdminAuthService) {}

  @Public()
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
}
