import { PrimaryGeneratedColumn, Column, Entity } from "typeorm"

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  password: string

  @Column()
  name: string

  @Column()
  age: number

  @Column({ default: true })
  active: boolean

  @Column({ default: 'MEMBER' })
  role: string
}