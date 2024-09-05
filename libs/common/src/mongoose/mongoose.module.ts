import { CONNECTION_NAME, ENVIRONMENT_PARAM } from '@app/common';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { MongooseDynamicModuleOptions } from './interfaces/mongoose-dynamic-module-options.interface';

@Module({})
export class MongooseDynamicModule {
  static registerAsync({
    connectionName = CONNECTION_NAME.PRIMARY,
  }: MongooseDynamicModuleOptions): DynamicModule {
    return {
      module: MongooseDynamicModule,
      imports: [
        MongooseModule.forRootAsync({
          connectionName,
          useFactory: (
            configService: ConfigService,
          ): MongooseModuleFactoryOptions => ({
            uri: this.getMongooseUriByConnectionName(
              connectionName,
              configService,
            ),
            // useUnifiedTopology: true,
            // maxPoolSize: Number(configService.get("MAX_POOL_SIZE")),
            // serverSelectionTimeoutMS: Number(
            //   configService.get("SERVER_MONGO_SELECTION_TIMEMOUT"),
            // ),
            // connectTimeoutMS: Number(
            //   configService.get("SERVER_MONGO_CONNECT_TIMEOUT"),
            // ), // Give up initial connection after 10 seconds
            // socketTimeoutMS: Number(
            //   configService.get("SERVER_MONGO_SOCKET_TIMEOUT"),
            // ), // Close sockets after 45 seconds of inactivity
            // family: 4, // Use IPv4, skip trying IPv6
            retryAttempts: 5,
          }),
          inject: [ConfigService],
        }),
      ],
      exports: [MongooseModule],
    };
  }

  static getMongooseUriByConnectionName(
    connectionName: keyof typeof CONNECTION_NAME,
    configService: ConfigService,
  ) {
    console.log(configService.get(ENVIRONMENT_PARAM.MONGO_URI));
    console.log(configService.get(ENVIRONMENT_PARAM.MONGO_URI_READONLY));
    switch (connectionName) {
      case CONNECTION_NAME.PRIMARY:
        return configService.get(ENVIRONMENT_PARAM.MONGO_URI);
      case CONNECTION_NAME.SECONDARY:
        return configService.get(ENVIRONMENT_PARAM.MONGO_URI_READONLY);
      case CONNECTION_NAME.PRIMARY_REPORT:
        return configService.get(ENVIRONMENT_PARAM.MONGO_REPORT_URI);
      case CONNECTION_NAME.SECONDARY_REPORT:
        return configService.get(ENVIRONMENT_PARAM.MONGO_REPORT_URI_READONLY);
      default:
        return configService.get(ENVIRONMENT_PARAM.MONGO_URI);
    }
  }
}
