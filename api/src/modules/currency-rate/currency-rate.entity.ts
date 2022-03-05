import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('currency_rates')
@Index(['base', 'to'], { unique: true })
export class CurrencyRateEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public base: string;

  @Column()
  public to: string;

  @Column({ type: 'real' })
  public rate: number;
}
