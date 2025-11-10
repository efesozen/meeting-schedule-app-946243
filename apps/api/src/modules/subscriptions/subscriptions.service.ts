import { UnitOfWork } from '@/core/database/unit-of-work.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateSubscriptionDto, SubscriptionResponseDto, UpdateSubscriptionDto } from '@saas-template/core';
import type { Subscription } from '@saas-template/database';
import { SubscriptionsRepository } from './subscriptions.repository';

@Injectable()
export class SubscriptionsService {
  constructor(
    private readonly subscriptionsRepository: SubscriptionsRepository,
    private readonly uow: UnitOfWork
  ) {}

  async findAll(userId: string): Promise<SubscriptionResponseDto[]> {
    const subscriptions = await this.subscriptionsRepository.findAll(userId);
    return subscriptions.map((subscription: Subscription) => this.toResponseDto(subscription));
  }

  async findOne(id: string, userId: string): Promise<SubscriptionResponseDto> {
    const subscription = await this.subscriptionsRepository.findById(id, userId);
    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }
    return this.toResponseDto(subscription);
  }

  async create(userId: string, dto: CreateSubscriptionDto): Promise<SubscriptionResponseDto> {
    return this.uow.execute(async () => {
      const subscription = await this.subscriptionsRepository.create(userId, dto);
      return this.toResponseDto(subscription);
    });
  }

  async update(id: string, userId: string, dto: UpdateSubscriptionDto): Promise<SubscriptionResponseDto> {
    return this.uow.execute(async () => {
      const subscription = await this.subscriptionsRepository.update(id, userId, dto);
      if (!subscription) {
        throw new NotFoundException('Subscription not found');
      }
      return this.toResponseDto(subscription);
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    return this.uow.execute(async () => {
      const deleted = await this.subscriptionsRepository.remove(id, userId);
      if (!deleted) {
        throw new NotFoundException('Subscription not found');
      }
    });
  }

  private toResponseDto(subscription: Subscription): SubscriptionResponseDto {
    return {
      id: subscription.id,
      user_id: subscription.user_id,
      plan: subscription.plan,
      status: subscription.status,
      start_date: subscription.start_date,
      end_date: subscription.end_date,
      createdAt: subscription.createdAt,
      updatedAt: subscription.updatedAt,
    };
  }
}
