import { NestFactory } from '@nestjs/core';
import { ReportServiceModule } from './report-service.module';
import { RmqService } from '@app/common/rabbit/rabbit.service';

async function bootstrap() {
  const app = await NestFactory.create(ReportServiceModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('BILLING'));
  await app.startAllMicroservices();
  app.listen('3010');
}
bootstrap();
