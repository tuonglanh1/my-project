import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// @ts-ignore
import { I18nJsonParser, I18nModule } from 'nestjs-i18n';
import { I18nDynamicModuleOptions } from './interfaces/i18n-dynamic-module-options.interface';

@Module({})
export class I18nDynamicModule {
  static forRoot({
    path,
    watch = true,
  }: I18nDynamicModuleOptions): DynamicModule {
    return {
      module: I18nDynamicModule,
      imports: [
        I18nModule.forRootAsync({
          imports: undefined,
          parser: I18nJsonParser,
          // @ts-ignore
          useFactory: (configService: ConfigService) => {
            return {
              fallbackLanguage: configService.get<string>('DEFAULT_LANGUAGE'),
              parserOptions: {
                path,
                // add this to enable live translations
                watch,
              },
            };
          },
          inject: [ConfigService],
        }),
      ],
    };
  }
}
