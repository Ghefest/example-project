import { Game } from '@pot-back/common';
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('cs_money_items')
export class CsMoneyItemEntity {
  @PrimaryColumn()
  public name: string;

  @Column({ type: 'numeric', default: 0, precision: 15, scale: 2 })
  public price: number;

  @Column({
    name: 'game_id',
    type: 'enum',
    enum: Game,
  })
  public gameId: Game;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;
}
