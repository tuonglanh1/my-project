import { NestFactory } from '@nestjs/core';
import { PortalServiceModule } from './portal-service.module';
import { json, urlencoded } from 'express';
import { ConfigService } from '@nestjs/config';
import { Common } from '@app/common/function';
import mongoose from 'mongoose';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ENVIRONMENT_PARAM } from '@app/common';
import { RedisIoAdapter } from './socket/redis.adapter';
import { ACK_QUEUES, RabbitMQService } from '@app/shared';
import * as _ from 'lodash';
import { QUEUES } from '@app/shared/microservices/enums';

async function bootstrap() {
  // const app = await NestFactory.create(PortalServiceModule);
  // await app.listen(3000);
  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   PortalServiceModule,
  //   {
  //     transport: Transport.TCP,
  //     options: { port: 3000 },
  //   },
  // );
  const app = await NestFactory.create(PortalServiceModule);
  app.use(json({ limit: '1mb' }));
  app.use(urlencoded({ limit: '1mb', extended: true }));
  app.enableCors();
  app.setGlobalPrefix('v1');
  const configService = app.get<ConfigService>(ConfigService);
  // console.log('configService:::', configService);
  // await app.listen();
  // write logs
  const logger: any[] = ['log', 'error', 'verbose', 'warn'];
  if (Common.valueToBoolean(configService.get(ENVIRONMENT_PARAM.IS_DEBUG))) {
    logger.push('debug');
    mongoose.set('debug', true);
  }
  app.useLogger(logger);

  // add swagger
  const options = new DocumentBuilder()
    .setTitle('Salesman API Mobile')
    .setDescription('The Salesman API description')
    .setVersion('1.0')
    .addTag('Auth')
    .addBearerAuth(
      {
        description: `Please enter token in following format: <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'Authorization',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis(configService);

  const rabbitMQService = app.get<RabbitMQService>(RabbitMQService);
  [
    QUEUES.PORTAL,
    //QUEUES.HEALTH_PORTAL,
    // QUEUES.PROCESS_IMPORT_CHANGE_STATUS, // Unused
  ].map((queue) => {
    const isAck = _.includes(ACK_QUEUES, queue) ? true : false;
    app.connectMicroservice(rabbitMQService.getOptions(queue, isAck));
  });

  await app.startAllMicroservices();

  const server = await app.listen(
    configService.get(ENVIRONMENT_PARAM.PORTAL_PORT),
    '0.0.0.0',
  );
  server.setTimeout(
    Number(configService.get(ENVIRONMENT_PARAM.SERVER_REQUEST_TIMEMOUT)) ??
      2000000,
  );

  console.log(
    `Environment: ${configService.get(ENVIRONMENT_PARAM.ENVIRONMENT)}`,
  );
  console.log(`Application is running on port: ${server.address().port}`);
  console.log(`SERVER URL: ${await app.getUrl()}`);
  console.log(
    `ENV KEYCLOAK_BASE_URL: ${configService.get(
      ENVIRONMENT_PARAM.KEYCLOAK_BASE_URL,
    )}`,
  );
  console.log(
    `ENV CLIENT_URL: ${configService.get(ENVIRONMENT_PARAM.CLIENT_URL)}`,
  );
  console.log(
    `ENV SERVER_URL: ${configService.get(ENVIRONMENT_PARAM.SERVER_URL)}`,
  );
  console.log(
    `ENV ECOMV2_URL: ${configService.get(ENVIRONMENT_PARAM.ECOMV2_URL)}`,
  );
  console.log(
    `ENV JSREPORT_PREVIEW_FILE_URL: ${configService.get(
      ENVIRONMENT_PARAM.JSREPORT_PREVIEW_FILE_URL,
    )}`,
  );
  console.log(
    `ENV ECOPAY_QRCODE_URL: ${configService.get(
      ENVIRONMENT_PARAM.ECOPAY_QRCODE_URL,
    )}`,
  );
  console.log(
    `ENV ECOPAY_QRCODE_PUBLIC_URL: ${configService.get(
      ENVIRONMENT_PARAM.ECOPAY_QRCODE_PUBLIC_URL,
    )}`,
  );
  console.log(`ENV AI_URL: ${configService.get(ENVIRONMENT_PARAM.AI_URL)}`);
}
bootstrap();
