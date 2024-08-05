import { ENVIRONMENT_PARAM } from '@app/common';
import {
  DynamicModule,
  Global,
  Logger,
  Module,
  Provider,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, RmqOptions, Transport } from '@nestjs/microservices';
import { RabbitMQConfig } from './config';
import { RabbitMQClientOptionsBuilder } from './rabbitmq-options.builder';
import { RmqClientProxy } from './rabbitmq.client';
import { RabbitMQService } from './rabbitmq.service';
import { RMQDynamicModuleOptions } from './types/dynamic-module.type';

@Global()
@Module({
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitMQModule {
  static register({ name }: RMQDynamicModuleOptions): DynamicModule {
    return {
      module: RabbitMQModule,
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
                queueOptions: {
                  durable: true,
                },
                socketOptions: {
                  noDelay: false,
                  retryAttempts: 5,
                  retryDelay: 10,
                  heartbeatIntervalInSeconds: 60,
                  reconnectTimeInSeconds: 5,
                },
              },
            }),
            inject: [ConfigService],
          },
        ]),
      ],
      providers: [RabbitMQService],
      exports: [ClientsModule, RabbitMQService],
    };
  }

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
      module: RabbitMQModule,
      providers,
      exports: [...Object.keys(RabbitMQConfig), RabbitMQService],
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
