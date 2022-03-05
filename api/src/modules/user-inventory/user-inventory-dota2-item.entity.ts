import { Dota2Quality, Game } from '@pot-back/common';
import { ChildEntity, Column } from 'typeorm';
import { GemInfo } from '../../common/classes/gems-parser';
import { UserInventoryItemEntity } from './user-inventory-item.entity';

@ChildEntity(Game.DOTA2)
export class UserInventoryDota2ItemEntity extends UserInventoryItemEntity {
  @Column({ type: 'enum', enum: Dota2Quality })
  public quality: Dota2Quality;

  @Column({ type: 'jsonb' })
  public gems: GemInfo[];
}
