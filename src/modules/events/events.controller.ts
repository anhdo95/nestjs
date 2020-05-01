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
} from '@nestjs/common';

import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { EventsService } from './events.service';
import { Event } from 'src/shared/interfaces/event'

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

  // @Get(':id')
  // @Roles('SuperAdmin')
  // findById(@Param('id', ParseIntPipe) id: number) {
  //   return this.usersService.findById(id);
  // }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createEventDto: Event) {
    return this.eventsService.create(createEventDto);
  }

  // @Put(':id')
  // @UsePipes(ValidationPipe)
  // @Roles('SuperAdmin')
  // update(@Param('id') id: number, @Body() updateUserDto: CreateUserDto) {
  //   return this.usersService.update(id, updateUserDto);
  // }

  // @Delete(':id')
  // @Roles('SuperAdmin')
  // delete(@Param('id') id: string) {
  //   return this.usersService.delete(id);
  // }
}
