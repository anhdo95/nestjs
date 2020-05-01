import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from 'src/shared/interfaces/event'

@Injectable()
export class EventsService {
  constructor(
    @InjectModel('Event') private readonly eventModel: Model<Event>,
  ) {}

  findAll() {
    return this.eventModel.find().exec()
  }

  async findById(id: number | string) {
    const event = await this.eventModel.findById(id).exec();

    if (!event) {
      throw new NotFoundException('The requested event is not found');
    }

    return event;
  }

  create(createEventDto: Event) {
    const event = new this.eventModel(createEventDto)

    return event.save()
  }
}
