import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('items_names_xs')
export class ItemNameXEntity {
  @PrimaryColumn()
  public name: string;

  @Column()
  public x: number;
}
