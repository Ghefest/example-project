import { nanoid } from 'nanoid';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Device } from '../../common/functions/get-device-from-req';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column()
  public username: string;

  @Column()
  public avatar: string;

  @Column({ name: 'steam_id64' })
  public steamId64: string;

  @Column({ type: 'numeric', default: 0 })
  public balance: number;

  @Column()
  public ip: string;

  @Column({ type: 'varchar' })
  public device: Device;

  @Column({ name: 'trade_offer_link', nullable: true })
  public tradeOfferLink: string;

  @Column({ nullable: true })
  public email: string;

  @Column({ name: 'telegram_tag', nullable: true })
  public telegramTag: string;

  @Column({ type: 'numeric', precision: 15, scale: 1, default: 0 })
  public discount: number;

  @Column({ name: 'referral_code', default: nanoid(10) })
  public referralCode: string;

  @Column({ nullable: true })
  public referrerId?: number;

  @ManyToOne(
    () => UserEntity,
    user => user.id,
  )
  @JoinColumn({ name: 'referrerId' })
  public referrer?: UserEntity;

  @Column({ name: 'percent_from_referral_sales', type: 'real', default: 1 })
  public percentFromReferralSales: number;

  @Column({ name: 'country_code', nullable: true })
  public countryCode?: string;

  @Column({ name: 'is_online', default: false })
  public isOnline: boolean;

  @Column({ name: 'last_visited_at', type: 'timestamptz', default: 'now()' })
  public lastVisitedAt: Date;

  @Column({ name: 'is_balance_banned', default: false })
  public isBalanceBanned: boolean;

  @Column({ name: 'profit_from_referrals', type: 'real', default: 0 })
  public profitFromReferrals: number;

  @Column({ name: 'profit_for_referrer', type: 'real', default: 0 })
  public profitForReferrer: number;

  @Column({ name: 'saved_payout_provider', nullable: true })
  public savedPayoutProvider?: string;

  @Column({ name: 'saved_payout_email', nullable: true })
  public savedPayoutEmail?: string;

  @Column({ name: 'saved_payout_purse', nullable: true })
  public savedPayoutPurse?: string;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @Column({ select: false, insert: false, default: null })
  public inventoryPrice?: number;

  @Column({ select: false, insert: false, default: null })
  public salesSum?: number;

  @Column({ select: false, insert: false, default: null })
  public numberOfReferrals?: number;
}
