import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export class CreateMeetingDto {
  @IsString()
  @MinLength(1)
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDate()
  start_time!: Date;

  @IsDate()
  end_time!: Date;

  @IsUUID()
  creator_id!: string;
}

export class UpdateMeetingDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  title?: string | undefined;

  @IsOptional()
  @IsOptional()
  @IsString()
  description?: string | undefined;

  @IsOptional()
  @IsDate()
  start_time?: Date | undefined;

  @IsOptional()
  @IsDate()
  end_time?: Date | undefined;

  @IsOptional()
  @IsUUID()
  creator_id?: string | undefined;
}

export class MeetingResponseDto {
  id!: string;
  title!: string;
  description?: string;
  start_time!: Date;
  end_time!: Date;
  creator_id!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
