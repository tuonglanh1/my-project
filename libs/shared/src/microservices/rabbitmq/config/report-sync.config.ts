import { Value } from './config';

export const DMS_REPORT_SYNC: Value<'DMS_REPORT_SYNC'> = {
    name: 'DMS_REPORT_SYNC',
    isAck: true,
    prefetchCount: 10,
    topics: {
        SYNC_STORE: 'DMS_REPORT_SYNC.SYNC_STORE',
        SYNC_ORDER: 'DMS_REPORT_SYNC.SYNC_ORDER',
        REAL_ROUTE: 'DMS_REPORT_SYNC.REAL_ROUTE',
        WORKING_TIMES_DATA: 'DMS_REPORT_SYNC.WORKING_TIMES_DATA',
        ROUTE: 'DMS_REPORT_SYNC.ROUTE',
        // KPI_TARGET: 'DMS_REPORT_SYNC.KPI_TARGET',
    },
    commands: {
        UPSERT: { cmd: 'DMS_REPORT_SYNC.UPSERT' },
    },
};
// satisfies Value<'DMS_REPORT_SYNC'> ;
