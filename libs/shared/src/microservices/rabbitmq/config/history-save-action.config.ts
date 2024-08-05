import { Value } from './config';

const queue_name = 'DMS_SAVE_ACTION_HISTORY';

export const DMS_SAVE_ACTION_HISTORY: Value<typeof queue_name> = {
    name: queue_name,
    isAck: false,
    prefetchCount: 10,
    commands: {
        GET_ACTION_HISTORY_BY_ID: {
            cmd: 'DMS_SAVE_ACTION_HISTORY.GET_ACTION_HISTORY_BY_ID',
        },
        SAVE_ACTION_HISTORY: {
            cmd: 'DMS_SAVE_ACTION_HISTORY.SAVE_ACTION_HISTORY',
        },
        UPDATE_ACTION_HISTORY: {
            cmd: 'DMS_SAVE_ACTION_HISTORY.UPDATE_ACTION_HISTORY',
        },
    },
    topics: {
        PUSH_SALEMAN_ACTION_HISTORY: `${queue_name}.PUSH_SALEMAN_ACTION_HISTORY`, // Lưu lịch sử thao tác
    },
};
