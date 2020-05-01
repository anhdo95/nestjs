import { PrimaryGeneratedColumn, Column, Entity, Unique } from "typeorm"
import { IsString, MaxLength } from "class-validator"

export enum RoleType {
  MEMBER = 1,
  CREATOR = 2,
  AGENCY = 3,
  ADMIN = 4,
  SUPER_ADMIN = 5,
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
    enum: RoleType
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