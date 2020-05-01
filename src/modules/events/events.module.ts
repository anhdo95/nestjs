import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EventSchema } from "src/database/schemas/event.schema";
import { EventsController } from "./events.controller";
import { EventsService } from "./events.service";
import { UsersService } from "../users/users.service";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: 'Event', schema: EventSchema }])
  ],
  controllers: [EventsController],
  providers: [
    UsersService,
    EventsService,
  ],
  exports: [MongooseModule]
})
export class EventsModule {}