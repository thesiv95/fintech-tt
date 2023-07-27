import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const APP_PORT = +process.env.APP_PORT || 3000;
  const app = await NestFactory.create(AppModule);
  await app.listen(APP_PORT);
  new Logger().debug(`App started: port ${APP_PORT}`);
}
bootstrap();
