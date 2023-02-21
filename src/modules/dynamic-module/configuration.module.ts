import { DynamicModule, Module } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';

@Module({})
export class ConfigurationModule {
  static register(options): DynamicModule {
    return {
      module: ConfigurationModule,
      providers: [
        {
          provide: 'CONFIGURATION_OPTIONS',
          useValue: options,
        },
        ConfigurationService,
      ],
      exports: [ConfigurationService],
    };
  }
}
