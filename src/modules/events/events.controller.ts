import {
  Controller,
  UseFilters,
  UseInterceptors,
  UseGuards,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { EventsService } from './events.service';
import { Event } from 'src/database/mongo-entities/event.entity'

@Controller('events')
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@UseInterceptors(TransformInterceptor)
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.eventsService.findById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createEventDto: Event) {
    return this.eventsService.create(createEventDto);
  }
}
