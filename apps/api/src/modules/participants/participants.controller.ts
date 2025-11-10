import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import type { CreateParticipantDto, ParticipantResponseDto, UpdateParticipantDto } from '@saas-template/core';
import type { User } from '@saas-template/database';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ParticipantsService } from './participants.service';

@Controller('participants')
@UseGuards(JwtAuthGuard)
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Get()
  async findAll(@CurrentUser() user: User): Promise<ParticipantResponseDto[]> {
    return this.participantsService.findAll(user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser() user: User): Promise<ParticipantResponseDto> {
    return this.participantsService.findOne(id, user.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreateParticipantDto,
    @CurrentUser() user: User
  ): Promise<ParticipantResponseDto> {
    return this.participantsService.create(user.id, dto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateParticipantDto,
    @CurrentUser() user: User
  ): Promise<ParticipantResponseDto> {
    return this.participantsService.update(id, user.id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @CurrentUser() user: User): Promise<void> {
    return this.participantsService.remove(id, user.id);
  }
}
