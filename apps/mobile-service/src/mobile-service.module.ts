import { Module } from '@nestjs/common';
import { MobileServiceController } from './mobile-service.controller';
import { MobileServiceService } from './mobile-service.service';
import { RmqModule } from '@app/common/rabbit/rabbit.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        `config/.env.${process.env.ENVIRONMENT || process.env.NODE_ENV}`,
      ],
      isGlobal: true,
    }),
    RmqModule.register({
      name: 'BILLING',
    }),
  ],
  controllers: [MobileServiceController],
  providers: [MobileServiceService],
})
export class MobileServiceModule {}
