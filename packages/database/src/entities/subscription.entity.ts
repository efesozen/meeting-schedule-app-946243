import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { User } from './user.entity';

@Entity({ name: 'subscriptions' })
export class Subscription extends BaseEntity {
  @Column({ type: 'enum', enum: ['free', 'basic', 'premium'] })
  plan!: 'free' | 'basic' | 'premium';

  @Column({ type: 'enum', enum: ['active', 'inactive', 'cancelled'] })
  @Index('idx_subscriptions_status')
  status!: 'active' | 'inactive' | 'cancelled';

  @Column({ type: 'timestamp with time zone' })
  start_date!: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  end_date?: Date;


@Column({ name: 'user_id' })
  user_id!: string;

  @Index('idx_subscriptions_user_id')
  @ManyToOne('User', 'subscriptions')
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
