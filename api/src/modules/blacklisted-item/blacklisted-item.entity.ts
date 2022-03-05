import { CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('blacklisted_items')
export class BlacklistedItemEntity {
  @PrimaryColumn()
  public name: string;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;
}
