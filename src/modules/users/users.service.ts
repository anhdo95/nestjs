import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "../database/entities/user.entity";
import { ActiveUserDto } from "./dto/active-user.dto";

@Injectable()
export class UsersService {
  private readonly users: User[] = [{
    id: 1,
    username: 'richarddo',
    password: '123456',
    name: 'Richard Do',
    age: 20,
    active: true,
    roles: ['SuperAdmin']
  }, {
    id: 2,
    username: 'johndoe',
    password: '123456',
    name: 'John Doe',
    age: 27,
    active: false,
    roles: ['Executor']
  }]

  findAll() {
    return this.users
  }

  findActiveUsers() {
    const users = this.users
      .filter(user => user.active)
      .map<ActiveUserDto>(user => new ActiveUserDto(user.id, user.name, user.age))

    return users
  }
  
  findById(id: number | string) {
    const user = this.users.find(user => user.id === Number(id))

    if (!user) {
      throw new NotFoundException('The requested user is not found')
    }

    return user
  }

  findByUsername(username: string) {
    const user = this.users.find(user => user.username === username)

    if (!user) {
      throw new NotFoundException('The requested user is not found')
    }

    return user
  }

  create(user: User) {
    user.id = this.users.length + 1
    this.users.push(user)
  }

  update(id: number | string, user: User) {
    const userToUpdateIndex = this.users.findIndex(u => u.id === Number(id))
    this.users[userToUpdateIndex] = user
  }

  delete(id: number | string) {
    const userToDeleteIndex = this.users.findIndex(u => u.id === Number(id))

    this.users.splice(userToDeleteIndex, 1)
  }
}