import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meeting } from '@saas-template/database';
import { DatabaseModule } from '@/core/database/database.module';
import { MeetingsController } from './meetings.controller';
import { MeetingsService } from './meetings.service';
import { MeetingsRepository } from './meetings.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Meeting]),
    DatabaseModule,
  ],
  controllers: [MeetingsController],
  providers: [MeetingsService, MeetingsRepository],
  exports: [MeetingsService],
})
export class MeetingsModule {}
