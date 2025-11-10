import { UnitOfWork } from '@/core/database/unit-of-work.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateParticipantDto, ParticipantResponseDto, UpdateParticipantDto } from '@saas-template/core';
import type { Participant } from '@saas-template/database';
import { ParticipantsRepository } from './participants.repository';

@Injectable()
export class ParticipantsService {
  constructor(
    private readonly participantsRepository: ParticipantsRepository,
    private readonly uow: UnitOfWork
  ) {}

  async findAll(userId: string): Promise<ParticipantResponseDto[]> {
    const participants = await this.participantsRepository.findAll(userId);
    return participants.map((participant: Participant) => this.toResponseDto(participant));
  }

  async findOne(id: string, userId: string): Promise<ParticipantResponseDto> {
    const participant = await this.participantsRepository.findById(id, userId);
    if (!participant) {
      throw new NotFoundException('Participant not found');
    }
    return this.toResponseDto(participant);
  }

  async create(userId: string, dto: CreateParticipantDto): Promise<ParticipantResponseDto> {
    return this.uow.execute(async () => {
      const participant = await this.participantsRepository.create(userId, dto);
      return this.toResponseDto(participant);
    });
  }

  async update(id: string, userId: string, dto: UpdateParticipantDto): Promise<ParticipantResponseDto> {
    return this.uow.execute(async () => {
      const participant = await this.participantsRepository.update(id, userId, dto);
      if (!participant) {
        throw new NotFoundException('Participant not found');
      }
      return this.toResponseDto(participant);
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    return this.uow.execute(async () => {
      const deleted = await this.participantsRepository.remove(id, userId);
      if (!deleted) {
        throw new NotFoundException('Participant not found');
      }
    });
  }

  private toResponseDto(participant: Participant): ParticipantResponseDto {
    return {
      id: participant.id,
      user_id: participant.user_id,
      meeting_id: participant.meeting_id,
      status: participant.status,
      createdAt: participant.createdAt,
      updatedAt: participant.updatedAt,
    };
  }
}
