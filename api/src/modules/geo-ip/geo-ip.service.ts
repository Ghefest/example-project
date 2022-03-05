import { WebServiceClient } from '@maxmind/geoip2-node';
import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_KEY } from './geo-ip.constants';
import { GeoIpConfig } from './geo-ip.interfaces';

@Injectable()
export class GeoIpService {
  private client: WebServiceClient;

  constructor(@Inject(CONFIG_KEY) config: GeoIpConfig) {
    const { accountID, licenseKey, options } = config;

    this.client = new WebServiceClient(accountID, licenseKey, options);
  }

  public country(ip: string) {
    return this.client.country(ip);
  }

  public city(ip: string) {
    return this.client.city(ip);
  }

  public insights(ip: string) {
    return this.client.insights(ip);
  }
}
