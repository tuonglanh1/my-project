import {
  RMQ_DEFAULT_NO_ACK,
  RMQ_DEFAULT_OPTIONS,
  RMQ_DEFAULT_PREFETCH_COUNT,
  RMQ_SOCKET_OPTIONS,
  RQM_DEFAULT_PERSISTENT,
} from './rabbitmq.constant';
import { RmqClientOptions } from './types/dynamic-module.type';

class RabbitMQOptionsBuilder {
  protected urls: RmqClientOptions['urls'];
  protected queueOptions: RmqClientOptions['queueOptions'] =
    RMQ_DEFAULT_OPTIONS;
  protected socketOptions: RmqClientOptions['queueOptions'] =
    RMQ_SOCKET_OPTIONS;
  protected queue: string;
  protected persistent: boolean = RQM_DEFAULT_PERSISTENT;

  constructor(protected readonly properties: Partial<RmqClientOptions>) {
    this.setUrls(properties.urls as string[]);
    this.setQueueName(properties.queue);
    properties.queueOptions && this.setQueueOptions(properties.queueOptions);
    properties.socketOptions && this.setSocketOptions(properties.socketOptions);
    properties.persistent && this.setPersistent(properties.persistent);
  }

  protected setUrls(urls: string[]) {
    this.urls = urls;
  }

  protected setQueueOptions(queueOptions: RmqClientOptions['queueOptions']) {
    this.queueOptions = queueOptions;
  }

  protected setQueueName(queueName: string) {
    this.queue = queueName;
  }

  protected setSocketOptions(socketOptions: RmqClientOptions['socketOptions']) {
    // this.setSocketOptions = socketOptions;
  }

  protected setPersistent(persisitent: boolean) {
    this.persistent = persisitent;
  }

  public getOptions(): RmqClientOptions {
    return {
      urls: this.urls,
      queueOptions: this.queueOptions,
      socketOptions: this.socketOptions,
      queue: this.queue,
      persistent: this.persistent,
    };
  }
}

export class RabbitMQClientOptionsBuilder extends RabbitMQOptionsBuilder {}

export class RabbitMQConsumerOptionsBuilder extends RabbitMQOptionsBuilder {
  private noAck: boolean = RMQ_DEFAULT_NO_ACK;
  private prefetchCount: number = RMQ_DEFAULT_PREFETCH_COUNT;
  constructor(protected readonly options: RmqClientOptions) {
    super(options);
    options.isAck && this.setNoAck(options.isAck);
    options.prefetchCount && this.setPrefetchCount(options.prefetchCount);
  }

  setNoAck(isAck: boolean) {
    this.noAck = !isAck;
  }

  override getOptions(): RmqClientOptions {
    return Object.assign(super.getOptions(), {
      noAck: this.noAck,
      prefetchCount: this.prefetchCount,
    });
  }

  setPrefetchCount(prefetchCount: number) {
    this.prefetchCount = prefetchCount;
  }
}
