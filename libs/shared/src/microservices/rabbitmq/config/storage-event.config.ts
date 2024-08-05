import { Value } from './config';

const queue_name = 'DMS_STORAGE_EVENT';

export const DMS_STORAGE_EVENT: Value<typeof queue_name> = {
    name: queue_name,
    isAck: true,
    prefetchCount: 10,
    commands: {
        IMPORT_EVENT_PARTICIPANT: {
            cmd: `${queue_name}.IMPORT_EVENT_PARTICIPANT`, // Import danh sách đăng ký CTTB
        },
    },
    topics: {
        CALCULATE_ORDER_PROGRESS_OF_EVENT_PARTICIPANT_PROCESS: `${queue_name}.CALCULATE_ORDER_PROGRESS_OF_EVENT_PARTICIPANT_PROCESS`, // Tính đơn hàng cho event process
        IMPORT_EVENT_REWARDING: `${queue_name}.IMPORT_EVENT_REWARDING`, // Import file trả thưởng CTTB
        GENERATE_PROCESSES_OF_EVENT_PARTICIPANT: `${queue_name}.GENERATE_PROCESSES_OF_EVENT_PARTICIPANT`, // Tạo tiến trình của đăng ký CTTB
        INACTIVE_EVENT: `${queue_name}.INACTIVE_EVENT`, // Ngưng Hoạt động CTTB đang ACTIVE
        EXCUTE_EVENT_PROCESS_FINISH_SCHEDULER: `${queue_name}.EXCUTE_EVENT_PROCESS_FINISH_SCHEDULER`, // Xử lý tiến trình CTTB khi kết thúc kỳ
    },
};
