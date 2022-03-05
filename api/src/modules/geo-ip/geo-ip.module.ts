import { DynamicModule, Module, Provider } from '@nestjs/common';
import { CONFIG_KEY } from './geo-ip.constants';
import { GeoIpConfig, GeoIpConfigFactory, GeoIpModuleAsyncConfig } from './geo-ip.interfaces';
import { GeoIpService } from './geo-ip.service';

@Module({})
export class GeoIpModule {
  static register(config: GeoIpConfig): DynamicModule {
    return {
      module: GeoIpModule,
      providers: [
        {
          provide: CONFIG_KEY,
          useValue: config,
        },
        GeoIpService,
      ],
      exports: [GeoIpService],
    };
  }

  static registerAsync(config: GeoIpModuleAsyncConfig) {
    const imports = [];
    const providers = this.createProviders(config);

    if (config.imports?.length) imports.push(...config.imports);

    return {
      module: GeoIpModule,
      imports,
      providers: [...providers, GeoIpService],
      exports: [GeoIpService],
    };
  }

  private static createProviders(config: GeoIpModuleAsyncConfig): Provider[] {
    const providers: Provider[] = [this.createModuleOptionsProvider(config)];

    if (config.useClass) {
      providers.push({
        provide: config.useClass,
        useClass: config.useClass,
      });
    }

    return providers;
  }

  private static createModuleOptionsProvider(options: GeoIpModuleAsyncConfig): Provider {
    if (options.useFactory) {
      return {
        provide: CONFIG_KEY,
        useFactory: options.useFactory,
        inject: options.inject ?? [],
      };
    }

    return {
      provide: CONFIG_KEY,
      useFactory: async (optionsFactory: GeoIpConfigFactory) => {
        return optionsFactory.createGeoIpConfig();
      },
      inject: [options.useExisting ?? options.useClass],
    };
  }
}
