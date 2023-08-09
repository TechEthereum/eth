import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  // 集合 DTO 入参校验
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3003);
}

bootstrap();
