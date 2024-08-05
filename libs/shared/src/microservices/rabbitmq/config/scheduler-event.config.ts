import { Value } from './config';

const queue_name = 'DMS_SCHEDULER_EVENT';

export const DMS_SCHEDULER_EVENT: Value<typeof queue_name> = {
    name: queue_name,
    isAck: false,
    prefetchCount: 10,
    commands: {
        // IMPORT_EVENT_PARTICIPANT: {
        //     cmd: `${queue_name}.IMPORT_EVENT_PARTICIPANT`, // Import danh sách đăng ký CTTB
        // },
    },
    topics: {
        // CALCULATE_ORDER_ACCUMULATE_PROCESS: `${queue_name}.CALCULATE_ORDER_ACCUMULATE_PROCESS`, // Tính đơn hàng cho event accumulate process
    },
};
