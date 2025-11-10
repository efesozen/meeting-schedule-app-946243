import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { Meeting } from './meeting.entity';
import type { User } from './user.entity';

@Entity({ name: 'participants' })
export class Participant extends BaseEntity {
  @Column({ type: 'enum', enum: ['invited', 'accepted', 'declined'] })
  status!: 'invited' | 'accepted' | 'declined';


@Column({ name: 'user_id' })
  user_id!: string;

  @Index('idx_participants_user_id')
  @ManyToOne('User', 'participants')
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ name: 'meeting_id' })
  meeting_id!: string;

  @Index('idx_participants_meeting_id')
  @ManyToOne('Meeting', 'participants')
  @JoinColumn({ name: 'meeting_id' })
  meeting!: Meeting;
}
