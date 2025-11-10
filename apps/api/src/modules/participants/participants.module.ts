import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participant } from '@saas-template/database';
import { DatabaseModule } from '@/core/database/database.module';
import { ParticipantsController } from './participants.controller';
import { ParticipantsService } from './participants.service';
import { ParticipantsRepository } from './participants.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Participant]),
    DatabaseModule,
  ],
  controllers: [ParticipantsController],
  providers: [ParticipantsService, ParticipantsRepository],
  exports: [ParticipantsService],
})
export class ParticipantsModule {}
