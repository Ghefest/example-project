import { HttpModule, Module, Provider } from '@nestjs/common';
import { MINE_EXCHANGE_OPTIONS_KEY } from './mine-exchange.constants';
import { MineExchangeModuleAsyncOptions, MineExchangeOptionsFactory } from './mine-exchange.interfaces';
import { MineExchangeService } from './mine-exchange.service';

@Module({})
export class MineExchangeModule {
  static registerAsync(options: MineExchangeModuleAsyncOptions) {
    const imports: any[] = [HttpModule];
    const providers = this.createProviders(options);

    if (options.imports?.length) imports.push(...options.imports);

    return {
      module: MineExchangeModule,
      imports,
      providers: [...providers, MineExchangeService],
      exports: [MineExchangeService],
    };
  }

  private static createProviders(options: MineExchangeModuleAsyncOptions): Provider[] {
    const providers: Provider[] = [this.createModuleOptionsProvider(options)];

    if (options.useClass) {
      providers.push({
        provide: options.useClass,
        useClass: options.useClass,
      });
    }

    return providers;
  }

  private static createModuleOptionsProvider(options: MineExchangeModuleAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: MINE_EXCHANGE_OPTIONS_KEY,
        useFactory: options.useFactory,
        inject: options.inject ?? [],
      };
    }

    return {
      provide: MINE_EXCHANGE_OPTIONS_KEY,
      useFactory: async (optionsFactory: MineExchangeOptionsFactory) => {
        return optionsFactory.createMineExchangeOptions();
      },
      inject: [options.useExisting ?? options.useClass],
    };
  }
}
