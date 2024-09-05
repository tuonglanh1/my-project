import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { Cache, CachingConfig } from 'cache-manager';
import * as lodash from 'lodash';
import { REDIS_KEY_PATTERNS } from './constants/key-patterns.constant';
import { ENUM_MODEL } from '@app/common';
import { convertValueToNumber, isJsonString, typeOf } from '@app/shared/utils';
import { ENUM_REDIS_TYPE } from '../enums';

@Injectable()
export class CacheService implements OnModuleInit {
  logger = new Logger(CacheService.name);
  client: Cache;
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  onModuleInit() {
    this.client = this.cacheManager;
  }

  async get(key: string): Promise<any> {
    this.logger.log(`*************** KEY->${key} ************`);
    return this.cacheManager.get(key);
  }

  async mGet(...args: string[] | any): Promise<Record<string, any>> {
    this.logger.log('**************** MGET **************');
    const mGetData = await this.cacheManager.store.mget(...args.flat(1));
    return mGetData.reduce((prevVal, curVal, i) => {
      prevVal[args.flat(1)[i]] = isJsonString(curVal)
        ? JSON.parse(curVal)
        : curVal;
      return prevVal;
    }, {});
  }

  async mSet(
    mData: Array<Record<string, any>> | Record<string, any>,
    ttl: number = 3600,
  ) {
    const mSetValue = this.mSetValue(mData);
    return await this.cacheManager.store.mset(...mSetValue);
  }

  async keys(...args: string[]): Promise<string[]> {
    return this.cacheManager.store.keys(...args.flat(1));
  }

  async set(key: string, value: any, options?: CachingConfig) {
    this.logger.log('************ CacheSet ***************');
    this.logger.debug(`Key: ${key}`);
    return this.cacheManager.set(key, value, options);
  }

  async del(key: string) {
    return this.cacheManager.del(key);
  }

  async mDel(keys: string[]) {
    return this.cacheManager.store.del(keys);
  }

  mSetValue(
    mData: Array<Record<string, any>> | Record<string, any>,
  ): Array<string> {
    if (typeOf(mData) === 'array') {
      const mDataConvert = mData.map((item) => {
        const [key] = lodash.keys(item);
        const value = JSON.stringify(item[key]);
        return { [key]: value };
      });

      return mDataConvert.flatMap(Object.entries).flat(1);
    }
    return Object.entries(mData).reduce((result, [key, val]: [string, any]) => {
      result.push(key);
      result.push(JSON.stringify(val));
      return result;
    }, []);
  }

  async summaryReportToQueueIncreaseErrorCount(
    command: string,
    id: string,
    type: 'SUMMARY_REPORT' | 'KPI_REPORT' = 'SUMMARY_REPORT',
  ) {
    const cacheKey = REDIS_KEY_PATTERNS[type].ERRORS_COUNT(command, id);
    const data: any = await this.cacheManager.get(cacheKey);
    const errorCount = convertValueToNumber(data?.count) + 1;
    await this.cacheManager.set(cacheKey, { count: errorCount }, { ttl: 600 });
    return errorCount;
  }

  async handleCronJobToQueueIncreaseErrorCount(
    command: string,
    modelName: ENUM_MODEL,
    companyCode: string,
    areaCode: string,
    page: string,
  ) {
    const cacheKey = REDIS_KEY_PATTERNS.CRON_JOB.ERRORS_COUNT(
      command,
      modelName,
      companyCode,
      areaCode,
      page,
    );
    const data: any = await this.cacheManager.get(cacheKey);
    const errorCount = convertValueToNumber(data?.count) + 1;

    await this.cacheManager.set(cacheKey, { count: errorCount }, { ttl: 900 });
    return errorCount;
  }

  async handleCleanCacheToQueue(
    command: string,
    modelName: ENUM_MODEL,
    companyCode: string,
    areaCode: string,
    page: string,
  ) {
    const cacheKey = REDIS_KEY_PATTERNS.CRON_JOB.ERRORS_COUNT(
      command,
      modelName,
      companyCode,
      areaCode,
      page,
    );
    await this.cacheManager.del(cacheKey);
  }

  async handleToQueueIncreaseActionCacheErrorCount(
    command: string,
    modelName: ENUM_MODEL,
    code: string,
    functionName: string,
  ) {
    const cacheKey = REDIS_KEY_PATTERNS.ACTION.ERRORS_COUNT(
      command,
      modelName,
      code,
      functionName,
    );
    const data: any = await this.cacheManager.get(cacheKey);
    const errorCount = convertValueToNumber(data?.count) + 1;
    await this.cacheManager.set(cacheKey, { count: errorCount }, { ttl: 900 });
    return errorCount;
  }

  async handleCleanRelatedActionCacheToQueue(
    command: string,
    modelName: ENUM_MODEL,
    code: string,
    functionName: string,
  ) {
    const cacheKey = REDIS_KEY_PATTERNS.ACTION.ERRORS_COUNT(
      command,
      modelName,
      code,
      functionName,
    );
    await this.cacheManager.del(cacheKey);
  }

  async handleModelToQueueIncreaseErrorCount(
    command: string,
    modelName: ENUM_MODEL,
    instance: any,
  ) {
    const cacheKey = REDIS_KEY_PATTERNS.MODEL_ERRORS_COUNT(
      command,
      modelName,
      instance?.code,
    );
    const data: any = await this.cacheManager.get(cacheKey);
    const errorCount = convertValueToNumber(data?.count) + 1;
    await this.cacheManager.set(cacheKey, { count: errorCount }, { ttl: 900 });
    return errorCount;
  }
  async handleCleanModelCacheToQueue(
    command: string,
    modelName: ENUM_MODEL,
    code: string,
  ) {
    const cacheKey = REDIS_KEY_PATTERNS.MODEL_ERRORS_COUNT(
      command,
      modelName,
      code,
    );
    await this.cacheManager.del(cacheKey);
  }

  async ttl(...cacheKeys: string[]) {
    return this.client.store.ttl(cacheKeys);
  }

  async handleBlockStorePromise(
    store_ids: Array<string>,
    distributor: string,
    isDelete: boolean = false,
  ) {
    const keys = store_ids?.map((id) => {
      return REDIS_KEY_PATTERNS.BLOCK_PROMISE.STORE_ROUTE(id, distributor);
    });
    if (!isDelete) {
      const values = await this.cacheManager.store.mget(keys);
      if (
        values?.filter((value) => {
          return value;
        })?.length
      ) {
        return values;
      }
      await Promise.all(
        store_ids.map(async (id) => {
          await this.cacheManager.set(
            REDIS_KEY_PATTERNS.BLOCK_PROMISE.STORE_ROUTE(id, distributor),
            id,
            { ttl: 3 * 60 },
          );
        }),
      );
    } else {
      await Promise.all(
        keys.map(async (key) => {
          await this.cacheManager.del(key);
        }),
      );
    }
    return [];
  }

  async handleBlockRoutePromise(route_id: string, type: ENUM_REDIS_TYPE) {
    const key = REDIS_KEY_PATTERNS.BLOCK_PROMISE.ROUTE(route_id);
    switch (type) {
      case ENUM_REDIS_TYPE.GET:
        return await this.cacheManager.get(key);
      case ENUM_REDIS_TYPE.SET:
        return await this.cacheManager.set(key, route_id, {
          ttl: 5 * 60,
        });
      case ENUM_REDIS_TYPE.DELETE:
        return await this.cacheManager.del(key);
    }
  }
}
