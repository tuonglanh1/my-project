import { Value } from './config';

export const DMS_REPORT_READ_PORTAL: Value<'DMS_REPORT_READ_PORTAL'> = {
    name: 'DMS_REPORT_READ_PORTAL',
    isAck: false,
    prefetchCount: 10,
    commands: {
        USER: {
            cmd: 'DMS_REPORT_READ_PORTAL.USER',
        },
        KPI_NORMAL: {
            cmd: 'DMS_REPORT_READ_PORTAL.KPI_NORMAL',
        },
        KPI_BY_TIME: {
            cmd: 'DMS_REPORT_READ_PORTAL.KPI_BY_TIME',
        },
        KPI_CATEGORY: {
            cmd: 'DMS_REPORT_READ_PORTAL.KPI_CATEGORY',
        },
        KPI_BY_ROUTE: {
            cmd: 'DMS_REPORT_READ_PORTAL.KPI_BY_ROUTE',
        },
        KPI_PRODUCT_BRAND: {
            cmd: 'DMS_REPORT_READ_PORTAL.KPI_PRODUCT_BRAND',
        },
        KPI_ACTIVE_STORE: {
            cmd: 'DMS_REPORT_READ_PORTAL.KPI_ACTIVE_STORE',
        },
        KPI_ASO: {
            cmd: 'DMS_REPORT_READ_PORTAL.KPI_ASO',
        },
        KPI_REACTIVE_STORE: {
            cmd: 'DMS_REPORT_READ_PORTAL.KPI_REACTIVE_STORE',
        },
        KPI_NEW_STORE_HAS_ORDER: {
            cmd: 'DMS_REPORT_READ_PORTAL.KPI_NEW_STORE_HAS_ORDER',
        },
        FIND_PLAN_ROUTE_BASE_ON_SYNCHORONIZED_ORDER: {
            cmd: 'DMS_REPORT_READ_PORTAL.FIND_PLAN_ROUTE_BASE_ON_SYNCHORONIZED_ORDER',
        },
        GET_COMPRESS_REPORT: {
            cmd: 'DMS_REPORT_READ_PORTAL.GET_COMPRESS_REPORT',
        },
        CHECK_STATUS_COMPRESS_REPORT: {
            cmd: 'DMS_REPORT_READ_PORTAL.CHECK_STATUS_COMPRESS_REPORT',
        },
    },
};

export const DMS_REPORT_READ_PLAN_ROUTE: Value<'DMS_REPORT_READ_PLAN_ROUTE'> = {
    name: 'DMS_REPORT_READ_PLAN_ROUTE',
    isAck: true,
    prefetchCount: 5,
    commands: {
        FIND_PLAN_ROUTE_BASE_ON_SYNCHORONIZED_ORDER: {
            cmd: 'DMS_REPORT_READ_PLAN_ROUTE.FIND_PLAN_ROUTE_BASE_ON_SYNCHORONIZED_ORDER',
        },
    },
};

export const DMS_REPORT_UPDATE_STATUS: Value<'DMS_REPORT_UPDATE_STATUS'> = {
    name: 'DMS_REPORT_UPDATE_STATUS',
    isAck: true,
    prefetchCount: 1,
    commands: {
        GET_DATA_EXPORT_BY_ID: {
            cmd: 'DMS_REPORT_UPDATE_STATUS.GET_DATA_EXPORT_BY_ID',
        },
    },
    topics: {
        REPORT_UPDATE_STATUS: 'DMS_REPORT_UPDATE_STATUS.REPORT_UPDATE_STATUS',
    },
};

export const DMS_REPORT_COMPRESS_EXPORT: Value<'DMS_REPORT_COMPRESS_EXPORT'> = {
    name: 'DMS_REPORT_COMPRESS_EXPORT',
    isAck: true,
    prefetchCount: 1,
    commands: {
        REPORT_VISIT_DETAIL: {
            cmd: 'DMS_REPORT_COMPRESS_EXPORT.REPORT_VISIT_DETAIL',
        },
        REPORT_VISIT_PLAN: {
            cmd: 'DMS_REPORT_COMPRESS_EXPORT.REPORT_VISIT_PLAN',
        },
        REPORT_COMPLIANCE_DATE: {
            cmd: 'DMS_REPORT_COMPRESS_EXPORT.REPORT_COMPLIANCE_DATE',
        },
        REPORT_CUMULATIVE_COMPLIANCE: {
            cmd: 'DMS_REPORT_COMPRESS_EXPORT.REPORT_CUMULATIVE_COMPLIANCE',
        },
        ORDER: {
            cmd: 'DMS_REPORT_COMPRESS_EXPORT.ORDER',
        },
        REPORT_ORDER_STATUS: {
            cmd: 'DMS_REPORT_COMPRESS_EXPORT.REPORT_ORDER_STATUS',
        },
        WORKING_TIMES: {
            cmd: 'DMS_REPORT_COMPRESS_EXPORT.WORKING_TIMES',
        },
        ROUTE: {
            cmd: 'DMS_REPORT_COMPRESS_EXPORT.ROUTE',
        },
    },
};

export const DMS_REPORT_GET_DATA: Value<'DMS_REPORT_GET_DATA'> = {
    name: 'DMS_REPORT_GET_DATA',
    isAck: true,
    prefetchCount: 3,
    commands: {
        REPORT_VISIT_DETAIL: {
            cmd: 'DMS_REPORT_GET_DATA.REPORT_VISIT_DETAIL',
        },
        REPORT_VISIT_PLAN: {
            cmd: 'DMS_REPORT_GET_DATA.REPORT_VISIT_PLAN',
        },
        REPORT_COMPLIANCE_DATE: {
            cmd: 'DMS_REPORT_GET_DATA.REPORT_COMPLIANCE_DATE',
        },
        REPORT_CUMULATIVE_COMPLIANCE: {
            cmd: 'DMS_REPORT_GET_DATA.REPORT_CUMULATIVE_COMPLIANCE',
        },
        ORDER: {
            cmd: 'DMS_REPORT_GET_DATA.ORDER',
        },
        REPORT_ORDER_STATUS: {
            cmd: 'DMS_REPORT_GET_DATA.REPORT_ORDER_STATUS',
        },
        WORKING_TIMES: {
            cmd: 'DMS_REPORT_GET_DATA.WORKING_TIMES',
        },
        ROUTE: {
            cmd: 'DMS_REPORT_GET_DATA.ROUTE',
        },
    },
};
