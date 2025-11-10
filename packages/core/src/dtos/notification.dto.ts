import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export class CreateNotificationDto {
  @IsUUID()
  meeting_id!: string;

  @IsUUID()
  user_id!: string;

  @IsString()
  @MinLength(1)
  message!: string;

  @IsBoolean()
  is_read!: boolean;
}

export class UpdateNotificationDto {
  @IsOptional()
  @IsUUID()
  meeting_id?: string | undefined;

  @IsOptional()
  @IsUUID()
  user_id?: string | undefined;

  @IsOptional()
  @IsString()
  @MinLength(1)
  message?: string | undefined;

  @IsOptional()
  @IsBoolean()
  is_read?: boolean | undefined;
}

export class NotificationResponseDto {
  id!: string;
  meeting_id!: string;
  user_id!: string;
  message!: string;
  is_read!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}
