import { RmqOptions } from '@nestjs/microservices';

export declare type RMQDynamicModuleOptions = {
  name: string;
};

export type RmqClientOptions = Exclude<RmqOptions['options'], 'noAck'> & {
  name?: string; // apply for old version
  isAck?: boolean;
  priority?: number;
  timeout?: number;
};
