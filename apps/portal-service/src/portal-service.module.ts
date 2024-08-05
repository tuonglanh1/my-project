import { Module } from '@nestjs/common';
import { PortalServiceController } from './portal-service.controller';
import { PortalServiceService } from './portal-service.service';
import { ConfigModule } from '@nestjs/config';
import { QUEUES, RabbitMQModule } from '@app/shared';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        `config/.env.${process.env.ENVIRONMENT || process.env.NODE_ENV}`,
      ],
      isGlobal: true,
    }),
    RabbitMQModule.register({ name: QUEUES.PORTAL }),
  ],
  controllers: [PortalServiceController],
  providers: [PortalServiceService],
})
export class PortalServiceModule {}
