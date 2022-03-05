import { CsGoRarity, CsGoType, Dota2Rarity, Dota2Type, Game } from '@pot-back/common';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, TableInheritance, Unique } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity('user_inventory_items')
@Unique('asset_id_game_index', ['assetId', 'game'])
@TableInheritance({ column: { name: 'game', type: 'enum', enum: Game } })
export abstract class UserInventoryItemEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'asset_id' })
  public assetId: string;

  @Column({ name: 'class_id' })
  public classId: string;

  @Column({ name: 'instance_id' })
  public instanceId: string;

  @Column()
  public name: string;

  @Column({ name: 'name_color' })
  public nameColor: string;

  @Column()
  public image: string;

  @Column({ name: 'border_color' })
  public borderColor: string;

  @Column({
    type: 'enum',
    enum: Game,
  })
  public game: Game;

  @Column({ type: 'varchar', length: '50' })
  public rarity: CsGoRarity | Dota2Rarity;

  @Column({ type: 'varchar', length: '40' })
  public type: CsGoType | Dota2Type;

  @ManyToOne(() => UserEntity)
  public user: UserEntity;
}
