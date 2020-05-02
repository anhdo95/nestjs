import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, Entity, OneToOne, JoinColumn } from "typeorm"
import { User } from "./user.entity"

export enum PostType {
  PHOTO = 'PHOTO',
  MUSIC = 'MUSIC',
  VIDEO = 'VIDEO',
  PRODUCT = 'PRODUCT'
}

export enum PostStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
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
  status: PostStatus

  @OneToOne(() => User, user => user.id)
  @JoinColumn()
  user: User

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}