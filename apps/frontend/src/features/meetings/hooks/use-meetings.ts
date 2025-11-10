import type { CreateMeetingDto, UpdateMeetingDto } from '@saas-template/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { meetingsService } from '../services';

const MEETING_KEY = ['meetings'];

export function useMeetings() {
  return useQuery({
    queryKey: MEETING_KEY,
    queryFn: () => meetingsService.getAll(),
  });
}

export function useMeeting(id: string) {
  return useQuery({
    queryKey: [...MEETING_KEY, id],
    queryFn: () => meetingsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateMeeting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMeetingDto) => meetingsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MEETING_KEY });
    },
  });
}

export function useUpdateMeeting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateMeetingDto }) =>
      meetingsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MEETING_KEY });
    },
  });
}

export function useDeleteMeeting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => meetingsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MEETING_KEY });
    },
  });
}
