import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SellDTO } from '@pot-back/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Repository } from 'typeorm';
import { CurrencyRateService } from '../currency-rate/currency-rate.service';
import { CreateOptions } from '../mine-exchange/mine-exchange.interfaces';
import { MineExchangeService } from '../mine-exchange/mine-exchange.service';
import { PaymentEntity, PaymentStatus, PaymentType } from './payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity) private paymentRepository: Repository<PaymentEntity>,
    private mineExchangeService: MineExchangeService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private logger: LoggerService,
    private currencyRateService: CurrencyRateService,
  ) {}

  public async payoutToUser(dto: {
    amountSendInUSD: number;
    purse: string;
    provider: SellDTO.CreateSell['paymentProvider'];
    email: string;
    userAgent: string;
    ip: string;
    userId: number;
  }) {
    const currencyRate = await this.currencyRateService.getCurrencyRate('USD', 'RUB');
    const { amountSendInUSD, purse, provider, email, userAgent, ip, userId } = dto;
    const amountSendInRUB = Number((amountSendInUSD * currencyRate.rate).toFixed(2));

    const createOptions: CreateOptions = {
      currency_send: 'VNRUB',
      currency_receive: provider,
      amount_send: amountSendInRUB,
      account_receive: purse,
    };

    const payment = new PaymentEntity();
    payment.type = PaymentType.PAYOUT;
    payment.accountReceive = purse;
    payment.amountSendInRub = amountSendInRUB;
    payment.currencyReceive = createOptions.currency_receive;
    payment.currencySend = createOptions.currency_send;

    await this.paymentRepository.save(payment);

    if (provider.includes('QW')) {
      createOptions.extra = {
        'client-email': email,
        'client-user-agent': userAgent,
        'client-ip': ip,
        'client-id': userId.toString(),
        'order-id': payment.id.toString(),
      };
    }

    const createResponse = await this.mineExchangeService.create(createOptions);
    if (createResponse.status !== 'success') {
      payment.error = createResponse.status_text;
      payment.status = PaymentStatus.ERROR;

      await this.paymentRepository.save(payment);
      throw new Error('create'); //todo
    }

    const payResponse = await this.mineExchangeService.pay({
      order_id: createResponse.order_id,
    });

    if (payResponse.status !== 'success') {
      payment.error = payResponse.status_text;
      payment.status = PaymentStatus.ERROR;

      await this.paymentRepository.save(payment);
      throw new Error('pay'); //todo
    }

    payment.status = PaymentStatus.PAY;
    payment.orderId = payResponse.order_id;
    return await this.paymentRepository.save(payment);
  }

  public async getMineExchangePaymentStatus(paymentId: number) {
    const payment = await this.paymentRepository.findOne(paymentId);
    return await this.mineExchangeService.check({ order_id: payment.orderId });
  }

  public async updatePaymentStatusToError(paymentId: number, statusText: string) {
    await this.paymentRepository.update({ id: paymentId }, { error: statusText, status: PaymentStatus.ERROR });
  }

  public async updatePaymentStatusToSuccess(paymentId: number) {
    await this.paymentRepository.update({ id: paymentId }, { status: PaymentStatus.SUCCESS });
  }
}
