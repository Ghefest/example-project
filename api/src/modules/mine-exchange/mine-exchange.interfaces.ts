import { ModuleMetadata, Type } from '@nestjs/common';

export interface MineExchangeOptions {
  apiKey: string;
}

export interface MineExchangeOptionsFactory {
  createMineExchangeOptions(): Promise<MineExchangeOptions> | MineExchangeOptions;
}

export interface MineExchangeModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<MineExchangeOptionsFactory>;
  useExisting?: Type<MineExchangeOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<MineExchangeOptions> | MineExchangeOptions;
}

export interface CreateOptions {
  currency_send: string;
  currency_receive: string;
  account_send?: string;
  account_receive: string;

  amount_send?: number;
  amount_receive?: number;

  /**
   * Only for qiwi
   */
  extra?: {
    'client-ip': string;
    'client-user-agent': string;
    'client-email': string;
    'client-id': string;
    'order-id': string;
  };
}

export interface BaseResponse {
  status:
    | 'error'
    | 'new'
    | 'order_error'
    | 'payout_error'
    | 'delete'
    | 'cancel'
    | 'verify'
    | 'pay_promised'
    | 'coldpay'
    | 'realpay'
    | 'payout_process'
    | 'success';
  status_text: string;
}

interface PaymentVariantBase {
  error: string | null;

  url?: string;
  number?: string;

  note?: string;
}

export interface CreateResponse extends BaseResponse {
  order_id: string;
  amount_send: string;
  currency_send: string;
  account_receive: string;
  amount_receive: string;
  currency_receive: string;

  server_time: string;

  payment_variants: {
    direct?: PaymentVariantBase;
    invoice?: Exclude<PaymentVariantBase, 'number'>;
    manual?: Exclude<PaymentVariantBase, 'url'>;

    hash?: Exclude<PaymentVariantBase, 'url' | 'number' | 'note'> & { id: string };
  };
}

export interface CheckOptions {
  order_id?: string;
  hash?: string;
}

export interface CheckResponse extends BaseResponse {
  order_id: string;
  account_send: string;
  amount_send: string;
  currency_send: string;
  account_receive: string;
  amount_receive: string;
  currency_receive: string;
  server_time: string;
}

export interface PayOptions {
  order_id?: string;
  hash?: string;
}

export interface PayResponse extends BaseResponse {
  order_id: string;
  amount_send: string;
  currency_send: string;
  amount_receive: string;
  currency_receive: string;
  server_time: string;
}

export interface BalanceOptions {
  currency: 'BTC' | 'USD' | 'RUB' | 'UAH';
}

export interface BalanceResponse extends BaseResponse {
  balance: number;
  currency: BalanceOptions['currency'];
  server_time: string;
}
