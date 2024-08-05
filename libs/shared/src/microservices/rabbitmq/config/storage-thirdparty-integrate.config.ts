import { Value } from './index';

const queue_name = 'DMS_STORAGE_THIRD_PARTY_INTEGRATE';

export const DMS_STORAGE_THIRD_PARTY_INTEGRATE: Value<typeof queue_name> = {
    name: queue_name,
    isAck: false,
    prefetchCount: 10,
    commands: {
        ASSET_ASSIGN_FROM_THIRD_PARTY: {
            cmd: `${queue_name}.ASSET_ASSIGN_FROM_THIRD_PARTY`, // Gán tài sản từ thirdparty
        },
        ASSET_RECALL_FROM_THIRD_PARTY: {
            cmd: `${queue_name}.ASSET_RECALL_FROM_THIRD_PARTY`, // Thu hồi tài sản từ thirdparty
        },
        GET_ASSET_VERIFY_HISTORY_FROM_THIRD_PARTY: {
            cmd: `${queue_name}.GET_ASSET_VERIFY_HISTORY_FROM_THIRD_PARTY`, // Get lịch sử kiểm tra tài sản cho thirdparty
        },
        GET_MASTER_DATA_FROM_THIRD_PARTY: {
            cmd: `${queue_name}.GET_MASTER_DATA_FROM_THIRD_PARTY`, // Get master data cho thirdparty
        },
        GET_STORE_FROM_THIRD_PARTY: {
            cmd: `${queue_name}.GET_STORE_FROM_THIRD_PARTY`, // Get store data cho thirdparty
        },
        GET_STORES_PARTICIPATING_EVENT_ACCUMULATE_THIRD_PARTY: {
            cmd: `${queue_name}.GET_STORES_PARTICIPATING_EVENT_ACCUMULATE_THIRD_PARTY`, // Get CH tham gia CTTL cho merchant
        },
    },
    topics: {},
};
