import { CONNECTION_NAME } from '@app/common';
import { ModuleMetadata, Type } from '@nestjs/common';

export interface MongooseDynamicModuleOptions {
  connectionName?: CONNECTION_NAME;
  uri?: string;
}

export interface MongooseModuleAsyncOptionsFactory {
  createConnection():
    | MongooseDynamicModuleOptions
    | Promise<MongooseDynamicModuleOptions>;
}

export interface MongooseAsyncModuleOptions
  extends Pick<ModuleMetadata, 'imports'> {
  connectionName?: string;
  useClass?: Type<MongooseModuleAsyncOptionsFactory>;
  useExisting?: Type<MongooseModuleAsyncOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<MongooseDynamicModuleOptions> | MongooseDynamicModuleOptions;
  inject?: any[];
}
