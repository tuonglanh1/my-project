import { RmqClientOptions } from './types/dynamic-module.type';

export const RMQ_OPTIONS = Symbol('RMQ_OPTIONS');
export const RMQ_SERVICE = Symbol('RMQ_SERVICE');

export const RMQ_DEFAULT_QUEUE = 'DEFAULT';
export const RMQ_DEFAULT_PREFETCH_COUNT = 3;
export const RMQ_DEFAULT_IS_GLOBAL_PREFETCH_COUNT = false;
export const RMQ_DEFAULT_NO_ACK = true;
export const RQM_DEFAULT_PERSISTENT = true;
export const RMQ_DEFAULT_OPTIONS: RmqClientOptions['queueOptions'] = {
  durable: true,
};
export const RMQ_SOCKET_OPTIONS: RmqClientOptions['socketOptions'] = {
  noDelay: false,
  retryAttempts: 5,
  retryDelay: 10,
  heartbeatIntervalInSeconds: 60,
  reconnectTimeInSeconds: 5,
};

export const rmqErrorHandlingConfig = {
  maxRetryAttemptsDefault: 3,
  scalingDuration: 1000,
  excludedStatusCodes: [400, 404, 500],
};
