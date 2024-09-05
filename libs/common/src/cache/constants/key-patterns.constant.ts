import { SummaryReport } from '@app/schemas/types/summary-report-schema.type';
import { REDIS_NAME_ENUM } from '../../../../common/src/enums/enum';

const DELIMITER = ':';
const concatSubKey = (...args: string[]) =>
    [prefixKey, ...args].filter(Boolean).join(DELIMITER);

const prefixKey = REDIS_NAME_ENUM.REDIS.toLowerCase();
export const REDIS_KEY_PATTERNS = {
    SUMMARY_REPORT: {
        USER: (user: string) =>
            [prefixKey, 'SUMMARY_REPORT', 'users', user].join(':'),
        GROUP: (group: string) =>
            [prefixKey, 'SUMMARY_REPORT', 'groups', group].join(':'),
        AREA_GROUP: (areeGroup: string) =>
            [prefixKey, 'SUMMARY_REPORT', 'area_groups', areeGroup].join(':'),
        RSM_AREA_GROUP: (rmsAreaGroup: string) =>
            [prefixKey, 'SUMMARY_REPORT', 'rsm_area_groups', rmsAreaGroup].join(
                ':'
            ),
        RSD_AREA_GROUP: (rsdAreaGroup: string) =>
            [prefixKey, 'SUMMARY_REPORT', 'rsd_area_groups', rsdAreaGroup].join(
                ':'
            ),
        ERRORS_COUNT: (command, id) =>
            [prefixKey, 'SUMMARY_REPORT', 'ERRORS_COUNT', command, id].join(
                ':'
            ),
    },
    SUMMARY_REPORT_APPLY_TIME: {
        USER: (user: string, applyTime: SummaryReport.ApplyTime) =>
            [prefixKey, 'SUMMARY_REPORT', applyTime, 'users', user].join(':'),
        GROUP: (group: string, applyTime: SummaryReport.ApplyTime) =>
            [prefixKey, 'SUMMARY_REPORT', applyTime, 'groups', group].join(':'),
        AREA_GROUP: (areaGroup: string, applyTime: SummaryReport.ApplyTime) =>
            [
                prefixKey,
                'SUMMARY_REPORT',
                applyTime,
                'area_groups',
                areaGroup,
            ].join(':'),
        RSM_AREA_GROUP: (
            rmsAreaGroup: string,
            applyTime: SummaryReport.ApplyTime
        ) =>
            [
                prefixKey,
                'SUMMARY_REPORT',
                applyTime,
                'rsm_area_groups',
                rmsAreaGroup,
            ].join(':'),
        RSD_AREA_GROUP: (
            rsdAreaGroup: string,
            applyTime: SummaryReport.ApplyTime
        ) =>
            [
                prefixKey,
                'SUMMARY_REPORT',
                applyTime,
                'rsd_area_groups',
                rsdAreaGroup,
            ].join(':'),
        ERRORS_COUNT: (command, id) =>
            [prefixKey, 'SUMMARY_REPORT', 'ERRORS_COUNT', command, id].join(
                ':'
            ),
    },
    KPI_REPORT: {
        USER: (user: string) =>
            [prefixKey, 'KPI_REPORT', 'users', user].join(':'),
        GROUP: (group: string) =>
            [prefixKey, 'KPI_REPORT', 'groups', group].join(':'),
        ERRORS_COUNT: (command, id) =>
            [prefixKey, 'KPI_REPORT', 'ERRORS_COUNT', command, id].join(':'),
        BACKUP: (kpiTarget: string) => concatSubKey('BACKUP_DATA', kpiTarget),
    },
    CRON_JOB: {
        ERRORS_COUNT: (command, modelName, companyCode, areaCode, page) =>
            areaCode
                ? [
                      prefixKey,
                      modelName,
                      'ERRORS_COUNT',
                      command,
                      companyCode,
                      areaCode,
                      page,
                  ].join(':')
                : [
                      prefixKey,
                      modelName,
                      'ERRORS_COUNT',
                      command,
                      companyCode,
                  ].join(':'),
    },
    ACTION: {
        ERRORS_COUNT: (command, modelName, code, functionName) =>
            [
                prefixKey,
                modelName,
                'ERRORS_COUNT',
                command,
                code,
                functionName,
            ].join(':'),
    },
    COMPANY: (companyId) => [prefixKey, 'COMPANY', companyId].join(':'),
    COMPANY_LIST: [prefixKey, 'COMPANY', 'LIST'].join(':'),
    MODEL_ERRORS_COUNT: (command, modelName, code) =>
        [prefixKey, modelName, 'ERRORS_COUNT', command, code].join(':'),
    BLOCK_PROMISE: {
        STORE_ROUTE: (store, distributor) =>
            [prefixKey, store, distributor].join(':'),
        ROUTE: (route) => [prefixKey, 'ROUTE_BLOCK_PROMISE', route].join(':'),
    },
    SUMMARY_REPORT_ORDER_DETAIL: (code) =>
        [prefixKey, 'SUMMARY_REPORT_ORDER_DETAIL', code].join(':'),
    PROCESS_IMPORT: (userId?: string) =>
        [prefixKey, 'PROCESS_IMPORT', userId].filter(Boolean).join(':'),
    ROLE: {
        PERMISSIONS: (roleId) =>
            [prefixKey, 'BELONG_TO_PERMISSONS', roleId].join(':'),
    },
    SYNC_STORE_MISS_DISTRIBUTOR: (company: string) =>
        [prefixKey, 'SYNC_STORE_MISS_DISTRIBUTOR', company].join(':'),
    ACTIVE_REACTIVE_STORE: (store: string) =>
        [prefixKey, 'ACTIVE_REACTIVE_STORE', store].filter(Boolean).join(':'),
};
