import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export enum SubscriptionPlan {
  FREE = 'free',
  BASIC = 'basic',
  PREMIUM = 'premium'
}

export enum SubscriptionStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  CANCELLED = 'cancelled'
}

export class CreateSubscriptionDto {
  @IsUUID()
  user_id!: string;

  @IsEnum(SubscriptionPlan)
  plan!: SubscriptionPlan;

  @IsEnum(SubscriptionStatus)
  status!: SubscriptionStatus;

  @IsDate()
  start_date!: Date;

  @IsOptional()
  @IsDate()
  end_date?: Date;
}

export class UpdateSubscriptionDto {
  @IsOptional()
  @IsUUID()
  user_id?: string | undefined;

  @IsOptional()
  @IsEnum(SubscriptionPlan)
  plan?: SubscriptionPlan | undefined;

  @IsOptional()
  @IsEnum(SubscriptionStatus)
  status?: SubscriptionStatus | undefined;

  @IsOptional()
  @IsDate()
  start_date?: Date | undefined;

  @IsOptional()
  @IsOptional()
  @IsDate()
  end_date?: Date | undefined;
}

export class SubscriptionResponseDto {
  id!: string;
  user_id!: string;
  plan!: SubscriptionPlan;
  status!: SubscriptionStatus;
  start_date!: Date;
  end_date?: Date;
  createdAt!: Date;
  updatedAt!: Date;
}
