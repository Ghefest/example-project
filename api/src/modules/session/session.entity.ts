import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity('sessions')
export class SessionEntity {
  @PrimaryColumn({ collation: 'default' })
  public sid: string;

  @Column('json')
  public sess: Record<string, any>;

  @Index('IDX_sessions_expire')
  @Column('timestamp')
  public expire: number;
}
