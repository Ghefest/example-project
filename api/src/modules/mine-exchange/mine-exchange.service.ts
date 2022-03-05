import { HttpService, Inject, Injectable } from '@nestjs/common';
import { MINE_EXCHANGE_API_URL, MINE_EXCHANGE_OPTIONS_KEY } from './mine-exchange.constants';
import {
  BalanceOptions,
  BalanceResponse,
  CheckOptions,
  CheckResponse,
  CreateOptions,
  CreateResponse,
  MineExchangeOptions,
  PayOptions,
  PayResponse,
} from './mine-exchange.interfaces';

@Injectable()
export class MineExchangeService {
  constructor(
    @Inject(MINE_EXCHANGE_OPTIONS_KEY) private options: MineExchangeOptions,
    private httpService: HttpService,
  ) {}

  public async create(options: CreateOptions): Promise<CreateResponse> {
    const url = MINE_EXCHANGE_API_URL + 'create';
    const params = {
      ...options,
      key: this.options.apiKey,
    };

    const response = await this.httpService.get(url, { params }).toPromise();
    return response?.data;
  }

  public async check(options: CheckOptions): Promise<CheckResponse> {
    const url = MINE_EXCHANGE_API_URL + 'check';
    const params = {
      ...options,
      key: this.options.apiKey,
    };

    const response = await this.httpService.get(url, { params }).toPromise();
    return response?.data;
  }

  public async pay(options: PayOptions): Promise<PayResponse> {
    const url = MINE_EXCHANGE_API_URL + 'pay';
    const params = { ...options, key: this.options.apiKey };

    const response = await this.httpService.get(url, { params }).toPromise();
    return response?.data;
  }

  public async balance(options: BalanceOptions): Promise<BalanceResponse> {
    const url = MINE_EXCHANGE_API_URL + 'balance';
    const params = { ...options, key: this.options.apiKey };

    const response = await this.httpService.get(url, { params }).toPromise();
    return response?.data;
  }
}
