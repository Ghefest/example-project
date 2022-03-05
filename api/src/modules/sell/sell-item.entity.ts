import { CsGoRarity, Dota2Rarity } from '@pot-back/common';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GemInfo } from '../../common/classes/gems-parser';
import { StickerInfo } from '../../common/classes/stickers-parser';
import { SellEntity } from './sell.entity';

@Entity('sell_items')
export class SellItemEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public image: string;

  @Column()
  public assetid: string;

  @Column({ default: 2 })
  public contextid: number;

  @Column()
  public appid: number;

  @Column({ type: 'jsonb', nullable: true })
  public gems: GemInfo[];

  @Column({ type: 'jsonb', nullable: true })
  public stickers: StickerInfo[];

  @Column({ type: 'real' })
  public price: number;

  @Column({ type: 'numeric' })
  public rubPrice: number;

  @Column({ type: 'varchar' })
  public rarity: CsGoRarity | Dota2Rarity;

  @Column({ name: 'rarity_color', type: 'varchar' })
  public rarityColor: string;

  @ManyToOne(
    () => SellEntity,
    sell => sell.items,
  )
  public sell: SellEntity;
}
