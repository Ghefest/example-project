import { HttpService, Inject, Injectable, LoggerService, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Repository } from 'typeorm';
import { CurrencyRateEntity } from './currency-rate.entity';

@Injectable()
export class CurrencyRateService implements OnModuleInit {
  constructor(
    @InjectRepository(CurrencyRateEntity) private currencyRateRepository: Repository<CurrencyRateEntity>,
    private httpService: HttpService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private logger: LoggerService,
    private configService: ConfigService,
  ) {}

  async onModuleInit() {
    const url = 'https://openexchangerates.org/api/latest.json';
    const appId = this.configService.get('openExchangeRatesAppId');

    const response = await this.httpService.get(url, { params: { app_id: appId } }).toPromise();
    if (response.status !== 200) {
      return this.logger.error(`Cant update currency rates. CurrencyRateService`);
    }
    const data = response.data;

    const currencyRate = new CurrencyRateEntity();
    currencyRate.base = data.base;
    currencyRate.to = 'RUB';
    currencyRate.rate = data.rates['RUB'];

    await this.currencyRateRepository
      .createQueryBuilder()
      .insert()
      .into(CurrencyRateEntity)
      .values(currencyRate)
      .onConflict(`("base", "to") DO UPDATE SET "rate" = :rate`)
      .setParameter('rate', currencyRate.rate)
      .execute();
  }

  public async getCurrencyRate(base: string, to: string) {
    return await this.currencyRateRepository.findOne({ base, to });
  }
}
