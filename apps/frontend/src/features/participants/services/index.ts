import { api } from '@/lib/api';
import type { ParticipantResponseDto, CreateParticipantDto, UpdateParticipantDto } from '@saas-template/core';

export const participantsService = {
  async getAll(): Promise<ParticipantResponseDto[]> {
    const response = await api.get('/participants');
    return response.data;
  },

  async getById(id: string): Promise<ParticipantResponseDto> {
    const response = await api.get(`/participants/${id}`);
    return response.data;
  },

  async create(data: CreateParticipantDto): Promise<ParticipantResponseDto> {
    const response = await api.post('/participants', data);
    return response.data;
  },

  async update(id: string, data: UpdateParticipantDto): Promise<ParticipantResponseDto> {
    const response = await api.put(`/participants/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/participants/${id}`);
  },
};
