// import { Common } from '@app/common';
import * as lodash from 'lodash';
import mongoose from 'mongoose';
import type { TDataList } from './function.types';

// export function getPageSkipLimit(params: any): {
//     page: number;
//     skip: number;
//     limit: number;
// } {
//     let { page, per_page, is_paging } = params;
//     is_paging = Common.valueToBoolean(is_paging);
//     page = Number(page) || 1;
//     const limit =
//         Common.valueToBoolean(is_paging) === false
//             ? Number.MAX_SAFE_INTEGER
//             : Math.min(Number(per_page) || 10, 1000);
//     const skip = (page - 1) * limit;
//     return { page, skip, limit };
// }

export const getMetaData = (
  currentPage: number,
  limit: number,
  totalItems: number,
) => ({
  limit: Number(limit),
  currentPage: Number(currentPage),
  totalItems: Number(totalItems),
  totalPages:
    Number(totalItems) % Number(limit) == 0
      ? Number(totalItems) / Number(limit)
      : Math.ceil(Number(totalItems) / Number(limit)),
});

export const $getMetadataAggregate = (
  currentPage: number,
  limit: number,
  $totalItems: string,
) => ({
  perPage: Number(limit),
  currentPage: Number(currentPage),
  totalItems: $totalItems,
  totalPages: {
    $cond: [
      { $eq: [{ $mod: [$totalItems, limit] }, 0] },
      { $divide: [$totalItems, limit] },
      { $ceil: { $divide: [$totalItems, limit] } },
    ],
  },
});

export const returnDataList = <T extends any>({
  data,
  count,
  page,
  limit,
}: TDataList<T>) => ({
  data,
  meta: getMetaData(page, limit, count),
});

export const typeOf = (
  value: any,
):
  | 'string'
  | 'number'
  | 'array'
  | 'object'
  | 'symbol'
  | 'bigint'
  | 'undefined'
  | 'null'
  | 'boolean'
  | 'regexp'
  | 'promise'
  | 'asyncfunction'
  | 'function' =>
  Object.prototype.toString.call(value).slice(8, -1).toLowerCase();

export const replacer = (key: any, value: any) => {
  if (typeOf(value) === 'regexp') return value?.toString();
  return value;
};

export const toMongoObjectId = (id: any): mongoose.Types.ObjectId => {
  try {
    return new mongoose.Types.ObjectId(id);
  } catch (error) {
    return id;
  }
};

export const formatNumberAsCurrency = (
  number,
  suffix = '',
  signal = ',',
  locale = 'vn-VI',
) => {
  const convertToNumber = convertValueToNumber(number);
  return typeOf(number === 'number')
    ? `${Intl.NumberFormat(locale)
        // .format(Number(convertToNumber.toPrecision(2)))
        .format(convertToNumber)
        .toString()}${suffix}`
        .trim()
        .replace(/,/g, signal)
    : `${String(convertToNumber)}${suffix}`;
};

export const convertValueToNumber = (value: any, decimal = 2) => {
  return isNaN(Number(value)) ? 0 : Number(Number(value).toFixed(decimal));
};

export const setUniqueListObjectId = (list: any[], id) =>
  lodash
    .uniq([...list, toMongoObjectId(id)].map(String))
    .map((item) => toMongoObjectId(item));

export const itemIndexInMultipleConditionArrayObject = (
  list: any[],
  fields: Record<string, any>,
) =>
  list.findIndex((item) =>
    Object.entries(fields).every(
      ([key, val]) => String(item[key]) === String(val),
    ),
  );

export const hasMultipleConditionInArrayObject = (
  list: any[],
  fields: Record<string, any>,
) => itemIndexInMultipleConditionArrayObject(list, fields) > -1;

export const isJsonString = (value: any): boolean => {
  try {
    JSON.parse(value);
  } catch (e) {
    return false;
  }
  return true;
};

export const pushItemsToUniqArray = (
  list: any[],
  items: any | any[],
  mapType: 'String' | 'ObjectId' | 'Number' | 'Boolean' = 'String',
): any[] => {
  return lodash
    .uniq(
      (list || [])
        .map(String)
        .concat(
          typeOf(items) === 'array' ? [...items.map(String)] : String(items),
        ),
    )
    .map((item) => {
      switch (mapType) {
        case 'ObjectId':
          return toMongoObjectId(item);
        case 'Number':
          return Number(item);
        case 'Boolean':
          return !!item;
        default:
          return String(item);
      }
    });
};

export const hasItemInArray = (list: any[], item: any, listField?: string) =>
  (list || []).some((listItem) =>
    listField
      ? String(listItem[listField]) === String(item)
      : String(listItem) === String(item),
  );

export const convertArrayToObject = (
  arr: Array<Record<string, any>>,
  key: string,
) => {
  return arr.reduce((obj, ele) => {
    const valueByKey = ele[key];
    obj[valueByKey] = ele;
    return obj;
  }, {});
};

export const convertDataToArray = (data: any): any[] =>
  typeOf(data) === 'array' ? data : [data].filter(Boolean);

export const pullItemsFromArray = (
  list: any[],
  items: any[] | any,
  objectKey?: string,
) => {
  const itemList = convertDataToArray(items);
  return list.filter(
    (ele) =>
      !itemList.some((item) =>
        typeOf(ele) === 'object' && objectKey
          ? String(ele[objectKey]) === String(item)
          : String(item) === String(ele),
      ),
  );
};

export const debounce = (milliseconds = 3000) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, milliseconds);
  });

export const getIdField = (fieldName: any) => fieldName?._id || fieldName;

export const calcPercentage = (
  numerator: number,
  denominator: number,
  digits = 2,
) => {
  if (denominator === 0 || isNaN(+denominator)) return null;

  return convertValueToNumber(
    (convertValueToNumber(numerator) /
      (convertValueToNumber(denominator) || 1)) *
      100,
    digits,
  );
};

export const mergeArrays = (...arrs: any[]) => [...new Set(arrs.flat(1))];

export const splitIntoChunkData = (data: any[], concurrently = 5) =>
  lodash.chunk(data, concurrently);

export const removeObjectUndefinedValue = (obj) =>
  Object.entries(obj).reduce((result, [key, val]) => {
    if (val === undefined) return result;
    result[key] = val;
    return result;
  }, {});

export const isLatitude = (lattitude: number) =>
  lattitude && isFinite(lattitude) && Math.abs(lattitude) <= 90;

export const isLongitude = (longitude: number) =>
  longitude && isFinite(longitude) && Math.abs(longitude) <= 180;

export const toBoolean = (value: any) => {
  const trueCollection = [true, 'true', 1, '1', 'yes', 'y'];
  const falseCollection = [false, 'false', 0, '0', 'no', 'n'];
  const lowerValue = String(value).toLowerCase();
  if (trueCollection.includes(lowerValue)) return true;
  if (falseCollection.includes(lowerValue)) return false;
  return undefined;
};

export const getCircularReplacer = () => {
  const seen = new WeakSet();
  return function (key: any, value: any) {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

export const stringify = (value: any): string =>
  JSON.stringify(value, getCircularReplacer());
