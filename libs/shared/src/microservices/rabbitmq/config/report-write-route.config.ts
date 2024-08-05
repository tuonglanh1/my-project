import { Value } from './config';

export const DMS_REPORT_WRITE_ROUTE: Value<'DMS_REPORT_WRITE_ROUTE'> = {
    name: 'DMS_REPORT_WRITE_ROUTE',
    isAck: true,
    prefetchCount: 10,
    topics: {
        GENERATE_PLAN_ROUTE: 'DMS_REPORT_WRITE_ROUTE.GENERATE_PLAN_ROUTE',
        REMOVE_DUPLICATE_PLAN_ROUTE:
            'DMS_REPORT_WRITE_ROUTE.REMOVE_DUPLICATE_PLAN_ROUTE',
        REMOVE_REAL_ROUTE: 'DMS_REPORT_WRITE_ROUTE.REMOVE_REAL_ROUTE',
    },
};

export const DMS_REPORT_WRITE_CONSISTENCY: Value<'DMS_REPORT_WRITE_CONSISTENCY'> =
    {
        name: 'DMS_REPORT_WRITE_CONSISTENCY',
        isAck: true,
        prefetchCount: 10,
        topics: {
            GENERATE_PLAN_ROUTE:
                'DMS_REPORT_WRITE_CONSISTENCY.GENERATE_PLAN_ROUTE',
        },
    };
