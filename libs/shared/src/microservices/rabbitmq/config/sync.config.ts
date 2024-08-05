import { Value } from './config';

export const queueName = 'DMS_SYNC_DATA';

export const DMS_SYNC_DATA: Value<typeof queueName> = {
  name: queueName,
  isAck: true,
  prefetchCount: 5,
  topics: {
    PUSH_ORDER_DMS_INFO: `${queueName}.PUSH_ORDER_DMS_INFO`,
  },
};
