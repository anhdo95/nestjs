import { Controller, Get, Req, HttpCode, Post, Put, Res, Redirect, Param } from '@nestjs/common'
import { Request, Response } from 'express'

import { ActiveUserDto } from './dto/active-user.dto'

interface User {
  id?: number,
  name: string,
  age: number,
  active?: boolean,
}

@Controller('users')
export class UsersController {

  users: User[] = [{
    id: 1,
    name: 'Richard Do',
    age: 20,
    active: true,
  }]

  @Get()
  findAll() {
    return this.users
  }

  @Get(':id')
  findById(@Param() param) {
    const user = this.users.find(user => user.id === +param.id)

    return user
  }

  @Post()
  @HttpCode(201)
  create(@Req() request: Request) {
    const newUser = request.body as User

    newUser.id = this.users.length + 1

    this.users.push(newUser)

    return newUser
  }

  @Put()
  update(@Req() request: Request, @Res() response: Response) {
    const userToUpdateIndex = this.users.findIndex(user => user.id === request.body.id)
    this.users[userToUpdateIndex] = (request.body as User)

    return response.json({
      status: response.statusCode,
      user: this.users[userToUpdateIndex]
    })
  }

  @Get('active')
  findActiveUsers(): ActiveUserDto[] {
    const users = this.users
      .filter(user => user.active)
      .map<ActiveUserDto>(user => new ActiveUserDto(user.id, user.name, user.age))

      console.log('users', users)

      return users
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs() {}
}