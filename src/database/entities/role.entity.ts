import { PrimaryGeneratedColumn, Column, Entity, Unique } from "typeorm"

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
  name: string

  @Column({
    type: 'enum',
    enum: RoleType
  })
  type: string

  @Column({
    type: 'enum',
    enum: RoleStatus,
    default: RoleStatus.ACTIVE
  })
  status: boolean
}