import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from 'src/database/mongo-entities/event.entity';
import { Repository } from 'typeorm';
import { APP_CONFIG } from 'src/shared/constants';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event, APP_CONFIG.DB.WRITE) private readonly eventRepository: Repository<Event>,
  ) {}

  findAll() {
    return this.eventRepository.find()
  }

  async findById(id: number | string) {
    const event = await this.eventRepository.findOne(id)

    if (!event) {
      throw new NotFoundException('The requested event is not found');
    }

    return event;
  }

  create(createEventDto: Event) {
    const event = this.eventRepository.create(createEventDto)

    return this.eventRepository.save(event)
  }
}
