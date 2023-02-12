import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';
import { BillingModule } from './billing.module';
import { RmqService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(BillingModule);
  app.enableCors();
  app.use(helmet());
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('BILLING'));
  await app.startAllMicroservices();
}
bootstrap();
