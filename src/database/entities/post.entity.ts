import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, Entity, OneToOne } from "typeorm"
import { User } from "./user.entity"

export enum PostType {
  PHOTO = 1,
  MUSIC = 2,
  VIDEO = 3,
  PRODUCT = 4
}

export enum PostStatus {
  ACTIVE = 1,
  INACTIVE = 0
}

@Entity()
export class Post {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column({
    type: 'enum',
    enum: PostType,
    default: PostType.PHOTO
  })
  type: string

  @Column()
  description: string

  @Column({
    type: 'enum',
    enum: PostStatus,
    default: PostStatus.ACTIVE
  })
  status: boolean

  @OneToOne(() => User, user => user.id)
  userId: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}