import { Value } from './config';

export const DMS_STORAGE_ROUTE: Value<'DMS_STORAGE_ROUTE'> = {
    name: 'DMS_STORAGE_ROUTE',
    isAck: true,
    prefetchCount: 5,
    topics: {
        //#region CRONJOB
        PUSH_EXPIRED_ROUTE_PROCESS:
            'DMS_STORAGE_ROUTE.PUSH_EXPIRED_ROUTE_PROCESS',
        PUSH_FUTURE_ROUTE_PROCESS:
            'DMS_STORAGE_ROUTE.PUSH_FUTURE_ROUTE_PROCESS',
        PUSH_REAL_ROUTE_PROCESS: 'DMS_STORAGE_ROUTE.PUSH_REAL_ROUTE_PROCESS',
        //#endregion
        UPDATE_EXPIRED_ROUTE: 'DMS_STORAGE_ROUTE.UPDATE_EXPIRED_ROUTE',
        UPDATE_FUTURE_ROUTE: 'DMS_STORAGE_ROUTE.UPDATE_FUTURE_ROUTE',
        UPDATE_RELATED_ROUTE: 'DMS_STORAGE_ROUTE.UPDATE_RELATED_ROUTE',
        UPDATED_EXPIRED_KPI_TARGET:
            'DMS_STORAGE_ROUTE.UPDATED_EXPIRED_KPI_TARGET',
        UPDATED_EXPIRED_SURVEY: 'DMS_STORAGE_ROUTE.UPDATED_EXPIRED_SURVEY',
        // UPDATE_RELATED_FURTURE_ROUTE_INFO:
        //     'DMS_STORAGE_ROUTE.UPDATE_RELATED_FURTURE_ROUTE_INFO',
    },
};

export const DMS_STORAGE_REAL_ROUTE: Value<'DMS_STORAGE_REAL_ROUTE'> = {
    name: 'DMS_STORAGE_REAL_ROUTE',
    isAck: true,
    prefetchCount: 3,
    topics: {
        UPDATE_CHECKOUT_END_DATE:
            'DMS_STORAGE_REAL_ROUTE.UPDATE_CHECKOUT_END_DATE',
        INIT_REAL_ROUTE_BEGIN_DAY:
            'DMS_STORAGE_REAL_ROUTE.INIT_REAL_ROUTE_BEGIN_DAY',
        REMOVE_DUPLICATE_REAL_ROUTE:
            'DMS_STORAGE_REAL_ROUTE.REMOVE_DUPLICATE_REAL_ROUTE',
    },
    commands: {
        GENERATE_REAL_ROUTE: {
            cmd: 'DMS_STORAGE_REAL_ROUTE.GENERATE_REAL_ROUTE',
        },
    },
};
