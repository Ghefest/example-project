import { CsGoExterior, Game } from '@pot-back/common';
import { ChildEntity, Column } from 'typeorm';
import { StickerInfo } from '../../common/classes/stickers-parser';
import { UserInventoryItemEntity } from './user-inventory-item.entity';

@ChildEntity(Game.CSGO)
export class UserInventoryCsGoItemEntity extends UserInventoryItemEntity {
  @Column({ type: 'enum', enum: CsGoExterior, nullable: true })
  public exterior: CsGoExterior;

  @Column({ type: 'jsonb' })
  public stickers: StickerInfo[];
}
