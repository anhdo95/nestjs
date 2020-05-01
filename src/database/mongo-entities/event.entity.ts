import { Entity, ObjectID, ObjectIdColumn, Column, Unique } from 'typeorm';
import { Expose } from 'class-transformer';
import { IsEnum, IsString, MaxLength } from 'class-validator';

export enum EventStatus {
  ACTIVE = 1,
  DELETED = 2,
  BLOCKED = 3,
  CANCELED = 4,
}

@Entity()
@Unique(['name'])
export class Event {
  
  @ObjectIdColumn()
  @Expose({ name: 'id' })
  _id: ObjectID

  @Column()
  @IsString()
  @MaxLength(100)
  name: string

  @Column()
  @IsString()
  @MaxLength(1024)
  description: string

  @Column({ type: 'enum', enum: EventStatus, default: EventStatus.ACTIVE })
  @IsEnum(EventStatus)
  status: EventStatus = EventStatus.ACTIVE
}