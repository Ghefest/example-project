import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('items_types_xs')
export class ItemTypeXEntity {
  @PrimaryColumn()
  public type: string;

  @Column()
  public x: number;
}
