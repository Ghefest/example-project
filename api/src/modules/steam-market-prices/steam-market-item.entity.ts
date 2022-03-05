import { Game } from '@pot-back/common';
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('steam_market_items')
export class SteamMarketItemEntity {
  @PrimaryColumn()
  public name: string;

  @Column({ type: 'real', default: 0 })
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
