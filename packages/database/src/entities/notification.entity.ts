import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { Meeting } from './meeting.entity';
import type { User } from './user.entity';

@Entity({ name: 'notifications' })
export class Notification extends BaseEntity {
  @Column()
  message!: string;

  @Column({ type: 'boolean' })
  is_read!: boolean;


@Column({ name: 'meeting_id' })
  meeting_id!: string;

  @Index('idx_notifications_meeting_id')
  @ManyToOne('Meeting', 'notifications')
  @JoinColumn({ name: 'meeting_id' })
  meeting!: Meeting;

  @Column({ name: 'user_id' })
  user_id!: string;

  @Index('idx_notifications_user_id')
  @ManyToOne('User', 'notifications')
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
