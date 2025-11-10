import type { CreateParticipantDto, UpdateParticipantDto } from '@saas-template/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { participantsService } from '../services';

const PARTICIPANT_KEY = ['participants'];

export function useParticipants() {
  return useQuery({
    queryKey: PARTICIPANT_KEY,
    queryFn: () => participantsService.getAll(),
  });
}

export function useParticipant(id: string) {
  return useQuery({
    queryKey: [...PARTICIPANT_KEY, id],
    queryFn: () => participantsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateParticipant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateParticipantDto) => participantsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PARTICIPANT_KEY });
    },
  });
}

export function useUpdateParticipant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateParticipantDto }) =>
      participantsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PARTICIPANT_KEY });
    },
  });
}

export function useDeleteParticipant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => participantsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PARTICIPANT_KEY });
    },
  });
}
