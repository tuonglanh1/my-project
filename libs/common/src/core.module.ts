import { Module, ParseIntPipe } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from './pipes/validation.pipe';
import { UnauthorizedExceptionFilter } from './filters/unauthorized-exception.filter';
import { ValidateObjectIdPipe } from './pipes/validate-object-id.pipes';
import { EmptyPipe } from './pipes/empty.pipe';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { GlobalHttpModule } from './http.module';
import { ScheduleModule } from '@nestjs/schedule';
// import { CacheDynamicModule } from './cache';
// import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ENVIRONMENT_PARAM } from '@app/common';
import { QUEUES, RabbitMQModule } from '@app/shared';
import { LoggerModule } from '@app/common/logger';
import { EventEmitterModule } from '@nestjs/event-emitter';
// import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        `config/.env.${process.env.ENVIRONMENT || process.env.NODE_ENV}`,
      ],
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get(ENVIRONMENT_PARAM.JWT_SECRET),
        signOptions: {
          expiresIn: configService.get(ENVIRONMENT_PARAM.JWT_EXPIRES_IN),
        },
      }),
      inject: [ConfigService],
    }),
    LoggerModule,
    GlobalHttpModule,
    ScheduleModule.forRoot(),
    // CacheDynamicModule.register(),
    EventEmitterModule.forRoot(),
    // I18nDynamicModule.forRoot({
    //   // eslint-disable-next-line prettier/prettier
    //     path: path.join(__dirname, '../../../../i18n/'),
    // }),
    // RabbitMQModule,
    RabbitMQModule.register({ name: QUEUES.TELEGRAM }),
    // RabbitMQModule.registerAsync(),
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
    // {
    //   provide: APP_FILTER,
    //   useClass: AllExceptionFilter,
    // },
    {
      provide: APP_FILTER,
      useClass: ParseIntPipe,
    },
    {
      provide: APP_FILTER,
      useClass: EmptyPipe,
    },
    {
      provide: APP_FILTER,
      useClass: ValidateObjectIdPipe,
    },
    {
      provide: APP_FILTER,
      useClass: UnauthorizedExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
  // exports: [CacheDynamicModule],
})
// export class CoreModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(LoggerMiddleware)
//       .forRoutes({ path: '*', method: RequestMethod.ALL });
//   }
// }
export class CoreModule {}
