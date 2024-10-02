import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { HttpModule } from './ui/http.module';

async function bootstrap() {
  const app = await NestFactory.create(HttpModule, {
    logger: process.env.CLI_LOGGING === 'true' ? new Logger() : false,
  });

  app.enableVersioning({
    type: VersioningType.URI
  });

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));


  await app.listen(
    String(process.env.NODE_PORT)
  );
}


bootstrap();
