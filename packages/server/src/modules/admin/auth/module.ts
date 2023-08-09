import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AdminUserModule } from '../user/module';
import { AdminAuthController } from './controller';
import { AdminAuthService } from './service';

@Module({
  imports: [
    AdminUserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const secret = configService.get('server.jwt.admin.secret');
        const expiresIn = configService.get('server.jwt.admin.expires');

        return { secret, signOptions: { expiresIn } };
      },
    }),
  ],
  providers: [AdminAuthService],
  controllers: [AdminAuthController],
  exports: [AdminAuthService],
})
export class AdminAuthModule {}
