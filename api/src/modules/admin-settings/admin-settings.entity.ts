import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum SellVariation {
  Automatic = 'automatic',
  Manual = 'manual',
}

@Entity('admin_settings')
export class AdminSettingsEntity {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ name: 'price_formula_x', default: 5 })
  public priceFormulaX: number;

  @Column({ name: 'item_buy_min_price', type: 'real', default: 1 })
  public itemBuyMinPrice: number;

  @Column({ name: 'item_buy_max_price', type: 'real', default: 70 })
  public itemBuyMaxPrice: number;

  @Column({ name: 'sell_variation', type: 'enum', enum: SellVariation, default: SellVariation.Manual })
  public sellVariation: SellVariation;

  @Column({ name: 'is_sales_enabled', default: true })
  public isSalesEnabled: boolean;

  @Column({ name: 'min_withdraw_sum', type: 'real', default: 1 })
  public minWithdrawSum: number;
}
