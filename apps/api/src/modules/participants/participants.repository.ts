import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Participant } from '@saas-template/database';
import type { CreateParticipantDto, UpdateParticipantDto } from '@saas-template/core';

@Injectable()
export class ParticipantsRepository extends Repository<Participant> {
  constructor(private dataSource: DataSource) {
    super(Participant, dataSource.createEntityManager());
  }

  async findAll(userId: string): Promise<Participant[]> {
    return this.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, userId: string): Promise<Participant | null> {
    return this.findOne({
      where: { id, userId },
    });
  }

  async create(userId: string, dto: CreateParticipantDto): Promise<Participant> {
    const participant = this.create({
      ...dto,
      userId,
    });
    return this.save(participant);
  }

  async update(id: string, userId: string, dto: UpdateParticipantDto): Promise<Participant | null> {
    const participant = await this.findById(id, userId);
    if (!participant) {
      return null;
    }

    Object.assign(participant, dto);
    return this.save(participant);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const participant = await this.findById(id, userId);
    if (!participant) {
      return false;
    }

    await this.softRemove(participant);
    return true;
  }
}
