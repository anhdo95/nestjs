import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn, OneToMany, Unique, ManyToOne, ManyToMany, JoinColumn } from "typeorm"
import { Exclude, Expose, Transform } from "class-transformer"
import { Role } from "./role.entity"
import { IsNumber, IsInt } from "class-validator"

@Entity()
@Unique(['username'])
export class User {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  @Exclude()
  password: string

  @Column()
  name: string

  @Column()
  @IsInt()
  age: number

  @Column({ default: true })
  active: boolean

  @ManyToOne(() => Role, role => role.id)
  @JoinColumn()
  @Transform(role => role.type)
  role: Role

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}