import { Value } from './config';

export const DMS_STORAGE: Value<'DMS_STORAGE'> = {
    name: 'DMS_STORAGE',
    isAck: true,
    prefetchCount: 2,
    commands: {},
    topics: {
        ACTIVE_REACTIVE_STORE: 'DMS_STORAGE.ACTIVE_REACTIVE_STORE',
        CREATED_STORE: 'DMS_STORAGE.CREATED_STORE',
    },
};
// satisfies Value<'DMS_STORAGE'>;
