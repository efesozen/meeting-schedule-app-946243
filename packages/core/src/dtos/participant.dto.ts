import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export enum ParticipantStatus {
  INVITED = 'invited',
  ACCEPTED = 'accepted',
  DECLINED = 'declined'
}

export class CreateParticipantDto {
  @IsUUID()
  user_id!: string;

  @IsUUID()
  meeting_id!: string;

  @IsEnum(ParticipantStatus)
  status!: ParticipantStatus;
}

export class UpdateParticipantDto {
  @IsOptional()
  @IsUUID()
  user_id?: string | undefined;

  @IsOptional()
  @IsUUID()
  meeting_id?: string | undefined;

  @IsOptional()
  @IsEnum(ParticipantStatus)
  status?: ParticipantStatus | undefined;
}

export class ParticipantResponseDto {
  id!: string;
  user_id!: string;
  meeting_id!: string;
  status!: ParticipantStatus;
  createdAt!: Date;
  updatedAt!: Date;
}
