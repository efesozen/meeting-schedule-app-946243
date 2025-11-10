import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { User } from './user.entity';

@Entity({ name: 'meetings' })
export class Meeting extends BaseEntity {
  @Column()
  title!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'timestamp with time zone' })
  @Index('idx_meetings_start_time')
  start_time!: Date;

  @Column({ type: 'timestamp with time zone' })
  @Index('idx_meetings_end_time')
  end_time!: Date;


@Column({ name: 'creator_id' })
  creator_id!: string;

  @Index('idx_meetings_creator_id')
  @ManyToOne('User', 'meetings')
  @JoinColumn({ name: 'creator_id' })
  user!: User;
}
