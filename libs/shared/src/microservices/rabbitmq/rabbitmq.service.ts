import { ENVIRONMENT_PARAM } from '@app/common';
import { TCPMessagePartern } from '@app/common/interfaces';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import {
  ClientProxy,
  ClientProxyFactory,
  RmqContext,
  RmqOptions,
  RmqRecordBuilder,
  Transport,
} from '@nestjs/microservices';
import { RmqClientOptions } from './types/dynamic-module.type';
import {
  RabbitMQClientOptionsBuilder,
  RabbitMQConsumerOptionsBuilder,
} from './rabbitmq-options.builder';
import { QUEUES, SYNC_COMMAND } from '../enums';
import { RabbitMQConfig } from './config';
import * as retry from 'async-retry';
import { getQueueNameByPattern } from './rabbitmq.helper';

@Injectable()
export class RabbitMQService {
  logger = new Logger(RabbitMQService.name);

  private urls: string[];
  constructor(private readonly configService: ConfigService) {
    this.urls = [
      this.configService.get<string>(ENVIRONMENT_PARAM.RMQ_URI) ||
        process.env.RMQ_URI,
    ];
  }

  // @Inject()
  //   i18n: I18nService;
  getOptions(queue: string, isAck: boolean = false): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        // urls: [this.configService.get<string>(ENVIRONMENT_PARAM.RMQ_URI)],
        urls: ['amqp://localhost:5672'],
        queue,
        noAck: !isAck,
        persistent: true,
        prefetchCount: 1,
        isGlobalPrefetchCount: true,
        queueOptions: {
          durable: true,
        },
      },
    };
  }

  ack(ctx: RmqContext) {
    const channel = ctx.getChannelRef();
    const message = ctx.getMessage();
    channel.ack(message);
  }

  async sendToQueueService(
    queue: ClientProxy,
    pattern: TCPMessagePartern,
    payload: any,
  ) {
    try {
      const response = queue.send<any>(pattern, payload);
      return await lastValueFrom(response);
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        throw new HttpException(
          //   await this.i18n.translate('errors.STATUS_CODE.503'),
          'errors.STATUS_CODE.503',
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      } else {
        throw error;
      }
    }
  }

  /**
   * Apply for new version
   * @param {RmqClientOptions} properties
   */
  getConsumer(properties: RmqClientOptions): RmqOptions {
    this.logger.debug(JSON.stringify(properties));
    properties.urls ??= this.urls;
    // const rmqOptions = new RabbitMQOptionsBuilder(properties).getOptions();

    return {
      transport: Transport.RMQ,
      // options: rmqOptions.getOptions(),
      options: new RabbitMQConsumerOptionsBuilder(properties).getOptions(),
    };
  }

  /**
   * Publish data to queue
   * @param queue
   * @param pattern
   * @param payload
   */
  publishDataToQueue<T extends any>(
    queue: string,
    pattern: Record<'cmd', string | any> | string,
    payload?: T,
    queueOptions?: RmqClientOptions,
  ) {
    this.logger.log('*********** publishDataToQueue ***********');
    this.logger.log(`QUEUE:: ${queue}`);
    this.logger.debug('PATTERN::', JSON.stringify(pattern));
    this.logger.debug('PAYLOAD::', JSON.stringify(payload));

    const rmqOptions = { ...queueOptions, queue };
    const record = this.createBuilder(payload, rmqOptions);
    if (queue) {
      const client = this.createClient(rmqOptions);
      client.emit<T, any>(pattern, record).subscribe({
        complete: () => {
          client.close();
        },
      });
    }
  }

  createClient(properties: RmqClientOptions) {
    properties.urls ??= this.urls;
    const rmqOptions = new RabbitMQClientOptionsBuilder(properties);
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: rmqOptions.getOptions(),
    });
  }

  /**
   * Pub/ sub data to queue
   * @param queue
   * @param pattern
   * @param payload
   */
  async pubSubDataToQueue<T extends any>(
    queue: keyof typeof QUEUES | QUEUES | string,
    pattern:
      | Record<'cmd', keyof typeof SYNC_COMMAND>
      | { cmd: string }
      | string,
    payload?: T,
    queueOptions?: RmqClientOptions,
  ): Promise<T> {
    try {
      this.logger.log('*********** pubSubDataToQueue ***********');
      this.logger.log(`QUEUE:: ${queue}`);
      this.logger.debug('PATTERN::', JSON.stringify(pattern));
      this.logger.debug('PAYLOAD::', JSON.stringify(payload));

      const rmqOptions = { ...queueOptions, queue };
      const record = this.createBuilder(payload, rmqOptions);
      const client = this.createClient(rmqOptions);
      return new Promise((resolve, reject) => {
        let result;
        client.send(pattern, record).subscribe({
          next: (value) => {
            result = value;
          },
          error: (error) => reject(error),
          complete: () => {
            client.close();
            return resolve(result);
          },
        });
      });
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        throw new HttpException(
          'errors.STATUS_CODE.503',
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      } else {
        throw error;
      }
    }
  }

  createBuilder(payload: any, options?: RmqClientOptions) {
    return new RmqRecordBuilder()
      .setOptions({
        ...options,
        priority: options.priority ?? 0,
      })
      .setData(payload)
      .build();
  }

  async subcribeMessage<T = any>(onMessage: any, ctx: RmqContext): Promise<T> {
    this.logger.log(`************ subcribeMessage *************`);
    const queueName = ctx.getArgByIndex(0).fields.routingKey;
    const pattern = ctx.getPattern();
    const traceLog = `${queueName}.${pattern}`;
    this.logger.debug(traceLog);
    const now = Date.now();
    try {
      return typeof onMessage === 'function'
        ? await onMessage()
        : await Promise.resolve(onMessage);
    } catch (error) {
      this.logger.error('MessageError', JSON.stringify(error));
      const canRetry =
        [408, 429, 502, 503, 504].includes(Number(error?.status)) ||
        /(Service is busy)|(WriteConflict)|(Unable to acquire lock)|(MongoServerError)|(MongoNetworkError)/.test(
          error?.message,
        );
      if (!canRetry) return;
      await this.handleRetryMessage(onMessage, ctx);
    } finally {
      this.logger.log(`AckMessage->${traceLog} after ${Date.now() - now}ms`);
      RabbitMQConfig[queueName]?.isAck !== false && this.ack(ctx);
    }
  }

  async handleRetryMessage(asyncFunction: any, ctx: RmqContext) {
    try {
      await retry(async () => await asyncFunction, {
        retries: 3,
        onRetry: async (error, attempt) => {
          this.logger.error(
            `Error consuming message, executing retry ${attempt}/3...`,
            error,
          );
          //   await debounce(1000 * attempt);
          await new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(true);
            }, 1000 * attempt);
          });
        },
      });
    } catch (error) {
      const queue = ctx.getArgByIndex(0).fields.routingKey;
      const { pattern, data } = JSON.parse(ctx.getArgByIndex(0).content);
      this.publishDataToQueue(queue, pattern, data);
    }
  }

  async sendData<T = any, K = any>(
    pattern: { cmd: string },
    payload: T,
    options: RmqClientOptions = { timeout: 60000 },
  ): Promise<K> {
    const queueName: string = getQueueNameByPattern(pattern);
    return (await this.pubSubDataToQueue(
      queueName,
      pattern,
      payload,
      options,
    )) as K;
  }

  publishData<T = any>(pattern: string, payload?: T): void {
    const queueName: string = getQueueNameByPattern(pattern);
    return this.publishDataToQueue(queueName, pattern, payload);
  }
}
