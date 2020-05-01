import { Module } from "@nestjs/common";
import { Event } from "src/database/mongo-entities/event.entity";
import { EventsController } from "./events.controller";
import { EventsService } from "./events.service";
import { UsersService } from "../users/users.service";
import { UsersModule } from "../users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { APP_CONFIG } from "src/shared/constants";

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([ Event ], APP_CONFIG.DB.WRITE)
  ],
  controllers: [EventsController],
  providers: [
    UsersService,
    EventsService,
  ],
  exports: [TypeOrmModule]
})
export class EventsModule {}