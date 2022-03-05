import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { SellEntity } from '../sell/sell.entity';

@Entity('steam_bots')
export class SteamBotEntity {
  @PrimaryColumn({ name: 'account_name' })
  public accountName: string;

  @Column()
  public password: string;

  @Column({ name: 'shared_secret' })
  public sharedSecret: string;

  @Column({ name: 'identity_secret' })
  public identitySecret: string;

  @Column()
  public avatar: string;

  @Column()
  public name: string;

  @Column({ name: 'profile_url' })
  public profileUrl: string;

  @Column({ name: 'trade_offer_url' })
  public tradeOfferUrl: string;

  // todo remove nullable
  @Column({ nullable: true })
  public proxy: string;

  @Column({ name: 'is_admin', default: false })
  public isAdmin: boolean;

  @Column({ name: 'is_deactivated', default: false })
  public isDeactivated: boolean;

  @Column({ type: 'varchar', array: true, nullable: true })
  public cookies: string[];

  @OneToOne(
    () => SellEntity,
    sell => sell.bot,
    { onDelete: 'SET NULL' },
  )
  @JoinColumn()
  public sell: SellEntity;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;
}
