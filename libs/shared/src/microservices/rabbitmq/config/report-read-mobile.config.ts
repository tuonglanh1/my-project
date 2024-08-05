import { Value } from './config';

export const DMS_REPORT_READ_MOBILE: Value<'DMS_REPORT_READ_MOBILE'> = {
    name: 'DMS_REPORT_READ_MOBILE',
    isAck: false,
    prefetchCount: 10,
    commands: {
        BUSINESS: {
            cmd: 'DMS_REPORT_READ_MOBILE.BUSINESS',
        },
        KPI_GET_LIST: {
            cmd: 'DMS_REPORT_READ_MOBILE.KPI_GET_LIST',
        },
        KPI_FILTER_TIME: {
            cmd: 'DMS_REPORT_READ_MOBILE.KPI_FILTER_TIME',
        },
        KPI_APPLY_TIME: {
            cmd: 'DMS_REPORT_READ_MOBILE.KPI_APPLY_TIME',
        },
        KPI_DAILY: {
            cmd: 'DMS_REPORT_READ_MOBILE.KPI_DAILY',
        },
        KPI_DAILY_TARGET: {
            cmd: 'DMS_REPORT_READ_MOBILE.KPI_DAILY_TARGET',
        },
        KPI_DAILY_TARGET_DETAIL: {
            cmd: 'DMS_REPORT_READ_MOBILE.KPI_DAILY_TARGET_DETAIL',
        },
        KPI_MAIN_PAGE: {
            cmd: 'DMS_REPORT_READ_MOBILE.KPI_MAIN_PAGE',
        },
        ORDER: {
            cmd: 'DMS_REPORT_READ_MOBILE.ORDER',
        },
        SALES_ORDER: {
            cmd: 'DMS_REPORT_READ_MOBILE.SALES_ORDER',
        },
        VISIT_STORE: {
            cmd: 'DMS_REPORT_READ_MOBILE.VISIT_STORE',
        },
        MAIN_PAGE: {
            cmd: 'DMS_REPORT_READ_MOBILE.MAIN_PAGE',
        },
        MAIN_PAGE_BY_TIME: {
            cmd: 'DMS_REPORT_READ_MOBILE.MAIN_PAGE_BY_TIME',
        },
        FOR_BUSINESS: {
            cmd: 'DMS_REPORT_READ_MOBILE.FOR_BUSINESS',
        },
        KPI_BY_TIME: {
            cmd: 'DMS_REPORT_READ_MOBILE.KPI_BY_TIME',
        },
        KPI: {
            cmd: 'DMS_REPORT_READ_MOBILE.KPI',
        },
        FOR_KPI_FILTER_TIME: {
            cmd: 'DMS_REPORT_READ_MOBILE.FOR_KPI_FILTER_TIME',
        },
        FOR_KPI_APPLY_TIME: {
            cmd: 'DMS_REPORT_READ_MOBILE.FOR_KPI_APPLY_TIME',
        },
        FOR_KPI_DAILY: {
            cmd: 'DMS_REPORT_READ_MOBILE.FOR_KPI_DAILY',
        },
        FOR_KPI_DAILY_TARGET: {
            cmd: 'DMS_REPORT_READ_MOBILE.FOR_KPI_DAILY_TARGET',
        },
        FOR_KPI_DAILY_TARGET_DETAIL: {
            cmd: 'DMS_REPORT_READ_MOBILE.FOR_KPI_DAILY_TARGET_DETAIL',
        },
        FOR_ORDER: {
            cmd: 'DMS_REPORT_READ_MOBILE.FOR_ORDER',
        },
        FOR_SALES_ORDER: {
            cmd: 'DMS_REPORT_READ_MOBILE.FOR_SALES_ORDER',
        },
        FOR_VISIT_STORE: {
            cmd: 'DMS_REPORT_READ_MOBILE.FOR_VISIT_STORE',
        },
        KPI_CATEGORY: {
            cmd: 'DMS_REPORT_READ_MOBILE.KPI_CATEGORY',
        },
    },
    topics: {},
};
