import { AdminUserModule } from '@/modules/admin/user/module';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AppAuthController } from './controller';
import { AppAuthService } from './service';

@Module({
  imports: [
    AdminUserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const secret = configService.get('server.jwt.app.secret');
        const expiresIn = configService.get('server.jwt.app.expires');

        return { secret, signOptions: { expiresIn } };
      },
    }),
  ],
  controllers: [AppAuthController],
  providers: [AppAuthService],
  exports: [AppAuthService],
})
export class AppAuthModule {}
