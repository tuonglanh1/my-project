import { Value } from './config';

export const DMS_SAVE_HISTORY: Value<'DMS_SAVE_HISTORY'> = {
    name: 'DMS_SAVE_HISTORY',
    isAck: false,
    prefetchCount: 3,
    commands: {},
    topics: {
        PUSH_SALEMAN_SAVE_HISTORY: `DMS_SAVE_HISTORY.PUSH_SALEMAN_SAVE_HISTORY`, // Lưu lịch sử dữ liệu
    },
};
