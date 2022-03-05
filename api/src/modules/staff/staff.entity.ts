import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum StaffRole {
  Creator = 'creator',
  Admin = 'admin',
  GeneralSupport = 'general support',
  Support = 'support',
  SEO = 'seo',
}

@Entity('staff')
export class StaffEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public login: string;

  @Column()
  public password: string;

  @Column({ type: 'enum', enum: StaffRole })
  public role: StaffRole;

  @Column()
  public google2faSecret: string;

  @CreateDateColumn()
  public createdAt: Date;

  public getRole() {
    return this.role;
  }
}
