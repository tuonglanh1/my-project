import { CacheModule, DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { RedisClientOptions } from 'redis';
import { CacheService } from './cache.service';
import { ENVIRONMENT_PARAM } from '@app/common';

@Module({
  providers: [CacheService],
  exports: [CacheService],
})
@Global()
export class CacheDynamicModule {
  static register(isGlobal = true, ttl = 3600): DynamicModule {
    return {
      module: CacheDynamicModule,
      imports: [
        CacheModule.registerAsync<RedisClientOptions>({
          // imports: [ConfigModule.forRoot({ load: [redisConfig] })],
          isGlobal,
          useFactory: (configService: ConfigService) => ({
            store: redisStore,
            url: `redis://${configService.get(ENVIRONMENT_PARAM.QUEUE_HOST)}:${configService.get(ENVIRONMENT_PARAM.QUEUE_PORT)}`,
            password:
              configService.get(ENVIRONMENT_PARAM.QUEUE_PASSWORD) ?? undefined,
            ttl,
          }),
          inject: [ConfigService],
        }),
      ],
    };
  }
}
