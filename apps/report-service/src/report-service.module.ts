import { Module } from '@nestjs/common';
import { ReportServiceController } from './report-service.controller';
import { ReportServiceService } from './report-service.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RmqModule } from '@app/common/rabbit/rabbit.module';
import { ConfigModule } from '@nestjs/config';
import { QUEUES } from '@app/shared';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        `config/.env.${process.env.ENVIRONMENT || process.env.NODE_ENV}`,
      ],
      isGlobal: true,
    }),
    RmqModule,
    // ClientsModule.register([
    //   {
    //     name: 'MATH_SERVICE',
    //     transport: Transport.RMQ,
    //     options: {
    //       urls: ['amqp://localhost:5672'],
    //       queue: 'cats_queue',
    //       queueOptions: {
    //         durable: false,
    //       },
    //     },
    //   },
    // ]),
  ],
  controllers: [ReportServiceController],
  providers: [ReportServiceService],
})
export class ReportServiceModule {}
