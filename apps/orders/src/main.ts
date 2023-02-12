import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { OrdersModule } from './orders.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(OrdersModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.enableCors();
  app.use(helmet());
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'), () => {
    console.log(`Order service running on port ${configService.get('PORT')}`);
  });
}
bootstrap();
