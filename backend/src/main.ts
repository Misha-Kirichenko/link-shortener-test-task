import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const globalPrefix = 'api';
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  //exclude redirection url
  app.setGlobalPrefix(globalPrefix, {
    exclude: ['/:shortUrl'],
  });
  app.set('trust proxy', true);
  await app.listen(process.env.API_PORT || 3000);
}
bootstrap();
