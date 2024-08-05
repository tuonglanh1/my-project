import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, RmqOptions, Transport } from '@nestjs/microservices';
import { RmqService } from './rabbit.service';
import { ENVIRONMENT_PARAM } from '../enums';
import { RMQDynamicModuleOptions } from '@app/shared/microservices/rabbitmq/types/dynamic-module.type';
import { RabbitMQConfig, RmqClientProxy } from '@app/shared';
import { RabbitMQClientOptionsBuilder } from '@app/shared/microservices/rabbitmq/rabbitmq-options.builder';

interface RmqModuleOptions {
  name: string;
}

@Module({
  providers: [RmqService],
  exports: [RmqService],
})
export class RmqModule {
  static register({ name }: RmqModuleOptions): DynamicModule {
    return {
      module: RmqModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name,
            useFactory: (configService: ConfigService) => ({
              transport: Transport.RMQ,
              options: {
                // urls: [configService.get<string>(ENVIRONMENT_PARAM.RMQ_URI)],
                urls: ['amqp://localhost:5672'],
                queue: name,
                // urls: [configService.get<string>('RABBIT_MQ_URI')],
                // queue: configService.get<string>(`RABBIT_MQ_${name}_QUEUE`),
                // urls: ['amqp://localhost:5672'],
                // queue: 'cats_queue',
              },
            }),
            inject: [ConfigService],
          },
        ]),
      ],
      exports: [ClientsModule, RmqService],
    };
  }
  // static register({ name }: RMQDynamicModuleOptions): DynamicModule {
  //   return {
  //     module: RmqModule,
  //     imports: [
  //       ClientsModule.registerAsync([
  //         {
  //           name,
  //           useFactory: (configService: ConfigService) => ({
  //             transport: Transport.RMQ,
  //             options: {
  //               urls: [configService.get<string>(ENVIRONMENT_PARAM.RMQ_URI)],
  //               queue: name,
  //               queueOptions: {
  //                 durable: true,
  //               },
  //               socketOptions: {
  //                 noDelay: false,
  //                 retryAttempts: 5,
  //                 retryDelay: 10,
  //                 heartbeatIntervalInSeconds: 60,
  //                 reconnectTimeInSeconds: 5,
  //               },
  //             },
  //           }),
  //           inject: [ConfigService],
  //         },
  //       ]),
  //     ],
  //     providers: [RmqService],
  //     exports: [ClientsModule, RmqService],
  //   };
  // }

  static registerAsync(): DynamicModule {
    const providers = Object.entries(RabbitMQConfig).map(([name, value]) => {
      return this.createAsyncProvider({
        name,
        useFactory: (configService: ConfigService) => {
          const urls = [configService.get<string>(ENVIRONMENT_PARAM.RMQ_URI)];
          const rmqClientOptionsBuilder = new RabbitMQClientOptionsBuilder({
            urls,
            queue: name,
            queueOptions: value.queueOptions,
            socketOptions: value.socketOptions,
          });
          return {
            transport: Transport.RMQ,
            options: rmqClientOptionsBuilder.getOptions(),
            // options: {
            //     urls: [
            //         configService.get<string>(
            //             ENVIRONMENT_PARAM.RMQ_URI
            //         ),
            //     ],
            //     queue: name,
            //     queueOptions: {
            //         durable: true,
            //     },
            //     socketOptions: {
            //         noDelay: false,
            //         retryAttempts: 5,
            //         retryDelay: 10,
            //         heartbeatIntervalInSeconds: 60,
            //         reconnectTimeInSeconds: 5,
            //     },
            // }
          };
        },
        inject: [ConfigService],
      });
    });

    return {
      module: RmqModule,
      providers,
      exports: [...Object.keys(RabbitMQConfig), RmqService],
    };
  }

  private static createAsyncProvider(option): Provider {
    return {
      provide: option.name,
      useFactory: this.createWrapperFactory(option.useFactory),
      inject: option.inject,
    };
  }

  private static createWrapperFactory(useFactory) {
    return function (...args: any) {
      const option = useFactory(...args);
      return new RmqClientProxy(option as RmqOptions);
    };
  }
}
