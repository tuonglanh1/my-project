import { NestFactory } from '@nestjs/core';
import { MobileServiceModule } from './mobile-service.module';
// import { ConfigService } from '@nestjs/config';
// import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(MobileServiceModule);
  // app.useGlobalPipes(new ValidationPipe());
  // const configService = app.get(ConfigService);
  await app.listen(3000);
}
bootstrap();
