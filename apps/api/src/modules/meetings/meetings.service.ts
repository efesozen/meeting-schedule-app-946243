import { UnitOfWork } from '@/core/database/unit-of-work.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateMeetingDto, MeetingResponseDto, UpdateMeetingDto } from '@saas-template/core';
import type { Meeting } from '@saas-template/database';
import { MeetingsRepository } from './meetings.repository';

@Injectable()
export class MeetingsService {
  constructor(
    private readonly meetingsRepository: MeetingsRepository,
    private readonly uow: UnitOfWork
  ) {}

  async findAll(userId: string): Promise<MeetingResponseDto[]> {
    const meetings = await this.meetingsRepository.findAll(userId);
    return meetings.map((meeting: Meeting) => this.toResponseDto(meeting));
  }

  async findOne(id: string, userId: string): Promise<MeetingResponseDto> {
    const meeting = await this.meetingsRepository.findById(id, userId);
    if (!meeting) {
      throw new NotFoundException('Meeting not found');
    }
    return this.toResponseDto(meeting);
  }

  async create(userId: string, dto: CreateMeetingDto): Promise<MeetingResponseDto> {
    return this.uow.execute(async () => {
      const meeting = await this.meetingsRepository.create(userId, dto);
      return this.toResponseDto(meeting);
    });
  }

  async update(id: string, userId: string, dto: UpdateMeetingDto): Promise<MeetingResponseDto> {
    return this.uow.execute(async () => {
      const meeting = await this.meetingsRepository.update(id, userId, dto);
      if (!meeting) {
        throw new NotFoundException('Meeting not found');
      }
      return this.toResponseDto(meeting);
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    return this.uow.execute(async () => {
      const deleted = await this.meetingsRepository.remove(id, userId);
      if (!deleted) {
        throw new NotFoundException('Meeting not found');
      }
    });
  }

  private toResponseDto(meeting: Meeting): MeetingResponseDto {
    return {
      id: meeting.id,
      title: meeting.title,
      description: meeting.description,
      start_time: meeting.start_time,
      end_time: meeting.end_time,
      creator_id: meeting.creator_id,
      createdAt: meeting.createdAt,
      updatedAt: meeting.updatedAt,
    };
  }
}
