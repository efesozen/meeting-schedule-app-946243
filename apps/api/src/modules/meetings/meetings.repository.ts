import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Meeting } from '@saas-template/database';
import type { CreateMeetingDto, UpdateMeetingDto } from '@saas-template/core';

@Injectable()
export class MeetingsRepository extends Repository<Meeting> {
  constructor(private dataSource: DataSource) {
    super(Meeting, dataSource.createEntityManager());
  }

  async findAll(userId: string): Promise<Meeting[]> {
    return this.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, userId: string): Promise<Meeting | null> {
    return this.findOne({
      where: { id, userId },
    });
  }

  async create(userId: string, dto: CreateMeetingDto): Promise<Meeting> {
    const meeting = this.create({
      ...dto,
      userId,
    });
    return this.save(meeting);
  }

  async update(id: string, userId: string, dto: UpdateMeetingDto): Promise<Meeting | null> {
    const meeting = await this.findById(id, userId);
    if (!meeting) {
      return null;
    }

    Object.assign(meeting, dto);
    return this.save(meeting);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const meeting = await this.findById(id, userId);
    if (!meeting) {
      return false;
    }

    await this.softRemove(meeting);
    return true;
  }
}
