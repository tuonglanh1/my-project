import { Value } from './config';

export const DMS_REPORT_SYNC_DATABASE: Value<'DMS_REPORT_SYNC_DATABASE'> = {
    name: 'DMS_REPORT_SYNC_DATABASE',
    isAck: false,
    prefetchCount: 5,
    commands: {
        TRANSACTION_GET: { cmd: 'DMS_REPORT_SYNC_DATABASE.TRANSACTION_GET' },
        TRANSACTION_SET: { cmd: 'DMS_REPORT_SYNC_DATABASE.TRANSACTION_SET' },
    },
};

export const DMS_REPORT_SYNC_DATABASE_STORE: Value<'DMS_REPORT_SYNC_DATABASE_STORE'> =
    {
        name: 'DMS_REPORT_SYNC_DATABASE_STORE',
        isAck: false,
        prefetchCount: 5,
        commands: {
            TRANSACTION_GET: {
                cmd: 'DMS_REPORT_SYNC_DATABASE_STORE.TRANSACTION_GET',
            },
            TRANSACTION_SET: {
                cmd: 'DMS_REPORT_SYNC_DATABASE_STORE.TRANSACTION_SET',
            },
        },
    };

export const DMS_REPORT_SYNC_DATABASE_ROUTE: Value<'DMS_REPORT_SYNC_DATABASE_ROUTE'> =
    {
        name: 'DMS_REPORT_SYNC_DATABASE_ROUTE',
        isAck: false,
        prefetchCount: 5,
        commands: {
            TRANSACTION_GET: {
                cmd: 'DMS_REPORT_SYNC_DATABASE_ROUTE.TRANSACTION_GET',
            },
            TRANSACTION_SET: {
                cmd: 'DMS_REPORT_SYNC_DATABASE_ROUTE.TRANSACTION_SET',
            },
        },
    };

export const DMS_REPORT_SYNC_DATABASE_CHECKSUM: Value<'DMS_REPORT_SYNC_DATABASE_CHECKSUM'> =
    {
        name: 'DMS_REPORT_SYNC_DATABASE_CHECKSUM',
        isAck: false,
        prefetchCount: 5,
        commands: {
            TRANSACTION_GET: {
                cmd: 'DMS_REPORT_SYNC_DATABASE_CHECKSUM.TRANSACTION_GET',
            },
            TRANSACTION_SET: {
                cmd: 'DMS_REPORT_SYNC_DATABASE_CHECKSUM.TRANSACTION_SET',
            },
        },
    };

export const DMS_REPORT_SYNC_DATABASE_EVENT: Value<'DMS_REPORT_SYNC_DATABASE_EVENT'> =
    {
        name: 'DMS_REPORT_SYNC_DATABASE_EVENT',
        isAck: false,
        prefetchCount: 5,
        commands: {
            TRANSACTION_GET: {
                cmd: 'DMS_REPORT_SYNC_DATABASE_EVENT.TRANSACTION_GET',
            },
            TRANSACTION_SET: {
                cmd: 'DMS_REPORT_SYNC_DATABASE_EVENT.TRANSACTION_SET',
            },
        },
    };

export const DMS_REPORT_SYNC_DATABASE_ORDER: Value<'DMS_REPORT_SYNC_DATABASE_ORDER'> =
    {
        name: 'DMS_REPORT_SYNC_DATABASE_ORDER',
        isAck: false,
        prefetchCount: 5,
        commands: {
            TRANSACTION_GET: {
                cmd: 'DMS_REPORT_SYNC_DATABASE_ORDER.TRANSACTION_GET',
            },
            TRANSACTION_SET: {
                cmd: 'DMS_REPORT_SYNC_DATABASE_ORDER.TRANSACTION_SET',
            },
        },
    };

export const DMS_REPORT_SYNC_DATABASE_INVENTORY: Value<'DMS_REPORT_SYNC_DATABASE_INVENTORY'> =
    {
        name: 'DMS_REPORT_SYNC_DATABASE_INVENTORY',
        isAck: false,
        prefetchCount: 5,
        commands: {
            TRANSACTION_GET: {
                cmd: 'DMS_REPORT_SYNC_DATABASE_INVENTORY.TRANSACTION_GET',
            },
            TRANSACTION_SET: {
                cmd: 'DMS_REPORT_SYNC_DATABASE_INVENTORY.TRANSACTION_SET',
            },
        },
    };
