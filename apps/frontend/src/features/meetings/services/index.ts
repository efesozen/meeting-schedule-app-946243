import { api } from '@/lib/api';
import type { MeetingResponseDto, CreateMeetingDto, UpdateMeetingDto } from '@saas-template/core';

export const meetingsService = {
  async getAll(): Promise<MeetingResponseDto[]> {
    const response = await api.get('/meetings');
    return response.data;
  },

  async getById(id: string): Promise<MeetingResponseDto> {
    const response = await api.get(`/meetings/${id}`);
    return response.data;
  },

  async create(data: CreateMeetingDto): Promise<MeetingResponseDto> {
    const response = await api.post('/meetings', data);
    return response.data;
  },

  async update(id: string, data: UpdateMeetingDto): Promise<MeetingResponseDto> {
    const response = await api.put(`/meetings/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/meetings/${id}`);
  },
};
