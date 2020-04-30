import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn, OneToMany, Unique } from "typeorm"
import { Exclude } from "class-transformer"
import { Role } from "./role.entity"

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
  age: number

  @Column({ default: true })
  active: boolean

  @OneToMany(() => Role, role => role.type)
  role: string[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}