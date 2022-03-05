import { CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('blacklisted_item_types')
export class BlacklistedItemTypeEntity {
  @PrimaryColumn()
  public type: string;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;
}
