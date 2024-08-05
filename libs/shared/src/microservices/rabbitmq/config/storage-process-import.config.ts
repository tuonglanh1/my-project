import { Value } from './index';

const queue_name = 'DMS_STORAGE_PROCESS_IMPORT';

export const DMS_STORAGE_PROCESS_IMPORT: Value<typeof queue_name> = {
    name: queue_name,
    isAck: false,
    prefetchCount: 10,
    commands: {
        PROCESS_IMPORT_CHANGE_STATUS: {
            cmd: `${queue_name}.PROCESS_IMPORT_CHANGE_STATUS`, // Trạng thái import file
        },
    },
    topics: {
        PROCESS_IMPORT_HANDLE_DETAIL_DATA: `${queue_name}.PROCESS_IMPORT_HANDLE_DETAIL_DATA`, // Chi tiết dữ liệu import file
        PROCESS_IMPORT_ACCESS_DATA: `${queue_name}.PROCESS_IMPORT_ACCESS_DATA`, // Import file chuyển sang trạng thái thành công
        PROCESS_IMPORT_EMIT_MESSAGE_CHANGE_STATUS: `${queue_name}.PROCESS_IMPORT_EMIT_MESSAGE_CHANGE_STATUS`, // Trả tín hiệu về cho socket (từ cache)
    },
};
