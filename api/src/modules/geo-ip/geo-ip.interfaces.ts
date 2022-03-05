import { ModuleMetadata, Type } from '@nestjs/common';

export interface GeoIpConfig {
  accountID: string;
  licenseKey: string;
  options?: number | { host?: string; timeout?: number };
}

export interface GeoIpConfigFactory {
  createGeoIpConfig(): Promise<GeoIpConfig> | GeoIpConfig;
}

export interface GeoIpModuleAsyncConfig extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<GeoIpConfigFactory>;
  useExisting?: Type<GeoIpConfigFactory>;
  useFactory?: (...args: any[]) => Promise<GeoIpConfig> | GeoIpConfig;
}
