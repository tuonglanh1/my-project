import * as moment from 'moment';
import { convertValueToNumber } from './functions.util';
export const dateFormatYMD = 'YYYY-MM-DD';
export const dateFormatDMY = 'DD-MM-YYYY';
export const dateFormatYMD_hms = 'YYYY-MM-DD HH:mm:ss';
export const dateFormatYMD_hm = 'YYYY-MM-DD hh:mm';
export const dateFormatDMY_hm = 'DD-MM-YYYY hh:mm';
export const dateFormatYMD_hmsA = 'YYYY-MM-DD hh:mm:ss a';
export const dateFormatYMD_hms24h = 'YYYY-MM-DD HH:mm:ss';
export const dateFormatDMY_hms24h = 'DD-MM-YYYY HH:mm:ss';
export const dateFormat_hms24h = 'HH:mm:ss';
export const dateFormatDM_hms = 'DD/MM hh:mm:ss';
export const dateFormatDM_hm = 'DD/MM hh:mm';

export const formatMySQLTimeStamp = (
    timestamp: string | Date = new Date()
): string => moment(timestamp).format(dateFormatYMD_hms);

export const year = (timestamp: Date) => new Date(timestamp).getFullYear();
export const month = (timestamp: Date) => new Date(timestamp).getMonth() + 1;
export const day = (timestamp: Date) => new Date(timestamp).getDate();

export const formatDateTime = (
    timestamp: string | Date = new Date(),
    formatType = dateFormatYMD
) =>
    timestamp && checkValidTimestamp(timestamp)
        ? moment(timestamp).format(formatType)
        : null;

export const formatTime = (timestamp: string | Date = new Date()) =>
    moment(timestamp).format('HH:mm:ss');

export const checkValidTimestamp = (timestamp) => moment(timestamp).isValid();

export const longDateFormatByLocale = (
    timestamp: string | number | Date = new Date(),
    locale = 'vi'
) => {
    moment.locale(locale);
    return moment(timestamp).format(dateFormatDMY_hms24h);
};

export const longDateFormatWithoutSecondByLocale = (
    timestamp: string | number | Date = new Date(),
    locale = 'vi'
) => {
    moment.locale(locale);
    return moment(timestamp).format(dateFormatDMY_hm);
};

export const dateTimeFormatByLocale = (
    timestamp: string | number | Date = new Date(),
    locale = 'vi'
) => {
    moment.locale(locale);
    return moment(timestamp).format(dateFormatDMY);
};

export const today = (dateFormat: string = dateFormatYMD) =>
    moment().format(dateFormat);

export const startOfDay = (date = new Date()) =>
    new Date(moment(date).startOf('day').format(dateFormatYMD_hms24h));

export const endOfDay = (date = new Date()) =>
    new Date(moment(date).endOf('day').format(dateFormatYMD_hms24h));

export const startOfMonth = (
    dateTime: Date = new Date(),
    dateFormat = dateFormatYMD_hms24h
) => new Date(moment(dateTime).startOf('month').format(dateFormat));

export const endOfMonth = (dateTime: Date, dateFormat = dateFormatYMD_hms24h) =>
    new Date(moment(dateTime).endOf('month').format(dateFormat));

export const startOfLastMonth = (dateFormat) =>
    moment()
        .subtract(1, 'months')
        .startOf('month')
        .format(dateFormat ? dateFormat : dateFormatYMD);

export const endOfLastMonth = (dateFormat) =>
    moment()
        .subtract(1, 'months')
        .endOf('month')
        .format(dateFormat ? dateFormat : dateFormatYMD);

export const startOfWeek = (dateFormat) =>
    moment()
        .startOf('week')
        .format(dateFormat ? dateFormat : dateFormatYMD);

export const endOfWeek = (dateFormat) =>
    moment()
        .endOf('week')
        .format(dateFormat ? dateFormat : dateFormatYMD);

export const previousDaysFromNow = (
    prevDay: number,
    dateFormat: string = dateFormatYMD
) => moment().subtract(prevDay, 'days').format(dateFormat);

export const beforeThirtyDays = (dateFormat): any =>
    moment()
        .subtract(30, 'days')
        .format(dateFormat ? dateFormat : dateFormatYMD);

export const start7Day = (dateFormat) =>
    moment()
        .subtract(7, 'days')
        .format(dateFormat ? dateFormat : dateFormatYMD);

export const start14Day = (dateFormat) =>
    moment()
        .subtract(14, 'days')
        .format(dateFormat ? dateFormat : dateFormatYMD);

export const start30Day = (dateFormat) =>
    moment()
        .subtract(30, 'days')
        .format(dateFormat ? dateFormat : dateFormatYMD);

export const yesterday = (dateFormat = dateFormatYMD) =>
    new Date(moment().subtract(1, 'days').format(dateFormat));

export const tomorrow = (
    date: Date = new Date(),
    dateFormat = dateFormatYMD_hms
) =>
    moment(date)
        .add(1, 'days')
        .format(dateFormat ? dateFormat : dateFormatYMD);

export const dateFromNow = (numberOfDays: number, dateFormat) =>
    moment()
        .add(numberOfDays, 'days')
        .format(dateFormat ? dateFormat : dateFormatYMD);

export const addDays = (sourceDate: Date, numberOfDays: number): Date =>
    moment(sourceDate).add(numberOfDays, 'days').toDate();

export const nowDate = (dateFormat) =>
    moment().format(dateFormat ? dateFormat : dateFormatYMD);

export const fromDate = (dateFormat: any) =>
    moment(
        beforeThirtyDays as moment.MomentInput,
        dateFormat ? dateFormat : dateFormatYMD
    );

export const toDate = (dateFormat) =>
    moment(
        nowDate as moment.MomentInput,
        dateFormat ? dateFormat : dateFormatYMD
    );

const padTo2Digits = (num) => {
    return num.toString().padStart(2, '0');
};

export const formatDate = (date) => {
    return (
        [
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
        ].join('-') +
        ' ' +
        [
            padTo2Digits(date.getHours()),
            padTo2Digits(date.getMinutes()),
            padTo2Digits(date.getSeconds()),
        ].join(':')
    );
};

export const ISO8601Formats = (timestamp: Date) =>
    moment(new Date(timestamp)).format(dateFormatYMD_hms24h);

export const formatDateYMD = (timestamp: Date) =>
    moment(new Date(timestamp)).format(dateFormatYMD);

export const formatDateYMDHM = (timestamp: Date) =>
    moment(new Date(timestamp)).format(dateFormatYMD_hm);

export const now = moment();

export const startOfToday = now.startOf('day').toString();

export const endOfToday = now.endOf('day').toString();

export const kpiDateTime = {
    toDay: new Date().getDate(),
    currentMonth: new Date().getMonth() + 1,
    currentYear: new Date().getFullYear(),
};

export const convertMillisecondsToHours = (milliseconds: number) =>
    milliseconds / 60 / 60 / 1000;

export const convertSecondsToHours = (seconds: number) => seconds / 60 / 60;

export const formatHoursToHHMM = (hours: number) => {
    const parseHour = Math.floor(hours);
    const parseMinute = convertValueToNumber((hours % parseHour) * 60, 0);
    return `${parseHour} giờ ${parseMinute} phút`;
};

export const CURRENT = (timeType: 'DAY' | 'MONTH' | 'YEAR' | 'FULLTIME') => {
    switch (timeType) {
        case 'DAY':
            return new Date().getDate();
        case 'MONTH':
            return new Date().getMonth() + 1;
        case 'YEAR':
            return new Date().getFullYear();
        case 'FULLTIME':
            return new Date();
    }
};

export const toYear = (dateTime: Date) => new Date(dateTime).getFullYear();
export const toMonth = (dateTime: Date) => new Date(dateTime).getMonth() + 1;
export const toDay = (dateTime: Date) => new Date(dateTime).getDate();

export const dateDiff = (date1, date2) =>
    new Date(date1).getTime() - new Date(date2).getTime();

export const targetFromSourceDate = (
    duration: number,
    sourceDate: Date = new Date(),
    operator: 'add' | 'subtract' = 'add',
    unit: moment.unitOfTime.DurationConstructor = 'day'
): Date => moment(sourceDate)[operator](duration, unit).toDate();
