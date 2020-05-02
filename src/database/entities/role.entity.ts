import { PrimaryGeneratedColumn, Column, Entity, Unique } from "typeorm"
import { IsString, MaxLength } from "class-validator"

export enum RoleType {
  MEMBER = 'MEMBER',
  CREATOR = 'CREATOR',
  AGENCY = 'AGENCY',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
  EXECUTOR = 'EXECUTOR'
}

export enum RoleStatus {
  INACTIVE = 0,
  ACTIVE = 1,
}

@Entity()
@Unique(['name', 'type'])
export class Role {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @IsString()
  @MaxLength(50)
  name: string

  @Column({
    type: 'enum',
    enum: RoleType,
    default: RoleType.MEMBER
  })
  @IsString()
  type: string

  @Column({
    type: 'enum',
    enum: RoleStatus,
    default: RoleStatus.ACTIVE
  })
  status: RoleStatus = RoleStatus.ACTIVE
}