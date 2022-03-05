import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum PaymentType {
  PAYOUT,
}

export enum PaymentStatus {
  CREATED,
  PAY,
  SUCCESS,
  ERROR,
}

@Entity('payments')
export class PaymentEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'enum', enum: PaymentType })
  public type: PaymentType;

  @Column({ nullable: true })
  public orderId?: string;

  @Column({ name: 'currency_send' })
  public currencySend: string;

  @Column({ name: 'currency_receive' })
  public currencyReceive: string;

  @Column({ name: 'amount_send_in_rub', type: 'real' })
  public amountSendInRub: number;

  @Column({ name: 'account_receive' })
  public accountReceive: string;

  @Column({ nullable: true })
  public error?: string;

  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.CREATED })
  public status: PaymentStatus;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;
}
