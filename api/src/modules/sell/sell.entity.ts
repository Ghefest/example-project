import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PaymentEntity } from '../payment/payment.entity';
import { SteamBotEntity } from '../steam-bot/steam-bot.entity';
import { UserEntity } from '../user/user.entity';
import { SellItemEntity } from './sell-item.entity';

export enum SellStatus {
  WaitingSupportAccept = 0,
  DeclinedBySupport = 1,
  AcceptedBySupport = 2,
  WaitingUserTradeConfirmation = 3,
  TradeAcceptedByUser = 4,
  TradeDeclinedByUser = 5,
  TradeTimeoutExceeded = 6,
  PayRequestToMerchant = 7,
  PayAcceptedByMerchant = 8,
  PayDeclinedByMerchant = 9,
  Completed = 10,
  Failed = 11,
}

export interface GivenItem {
  name: string;
  image: string;
}

@Entity('sells')
export class SellEntity {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ name: 'trade_id', nullable: true })
  public tradeId?: string;

  @Column({ type: 'enum', enum: SellStatus, default: SellStatus.WaitingSupportAccept })
  public status: SellStatus;

  @ManyToOne(() => UserEntity)
  public user: UserEntity;

  @OneToOne(
    () => SteamBotEntity,
    bot => bot.sell,
    { onDelete: 'SET NULL' },
  )
  public bot: SteamBotEntity;

  @OneToMany(
    () => SellItemEntity,
    item => item.sell,
    { cascade: ['insert'] },
  )
  public items: SellItemEntity[];

  @Column({ name: 'given_item', type: 'jsonb', nullable: true })
  public givenItem?: GivenItem;

  @Column({ name: 'accept_trade_until', type: 'timestamp without time zone', nullable: true })
  public acceptTradeUntil?: Date;

  @Column({ name: 'total_items_price', type: 'real' })
  public totalItemsPrice: number;

  @Column()
  public ip: string;

  @Column()
  public userAgent: string;

  @Column()
  public paymentProvider: string;

  @Column()
  public email: string;

  @Column()
  public purse: string;

  @Column({ nullable: true })
  public paymentId?: number;

  @OneToOne(() => PaymentEntity)
  @JoinColumn({ name: 'paymentId' })
  public payment?: PaymentEntity;

  @Column({ nullable: true })
  public error?: string;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;
}
