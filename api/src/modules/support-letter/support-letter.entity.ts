import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('support_letters')
export class SupportLetterEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public email: string;

  @Column()
  public subject: string;

  @Column()
  public message: string;

  @Column({ nullable: true })
  public image?: string;

  @Column({ default: false })
  public isSolved: boolean;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;
}
