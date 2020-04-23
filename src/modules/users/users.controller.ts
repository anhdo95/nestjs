import { Controller, Get, Req, HttpCode, Post, Put, Res, Redirect, Param, Body, Delete, HttpStatus } from '@nestjs/common'
import { Request, Response } from 'express'

import { User } from '../database/entities/user.entity'
import { ActiveUserDto } from './dto/active-user.dto'
import { CreateUserDto } from './dto/create-user-dto'


@Controller('users')
export class UsersController {

  users: User[] = [{
    id: 1,
    name: 'Richard Do',
    age: 20,
    active: true,
  }, {
    id: 2,
    name: 'John Doe',
    age: 27,
    active: false,
  }]

  @Get()
  findAll() {
    return this.users
  }

  @Get('active')
  findActiveUsers(): ActiveUserDto[] {
    const users = this.users
      .filter(user => user.active)
      .map<ActiveUserDto>(user => new ActiveUserDto(user.id, user.name, user.age))

      return users
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs() {}

  @Get(':id')
  findById(@Param('id') id: string) {
    const user = this.users.find(user => user.id === Number(id))

    return user
  }

  @Post()
  @HttpCode(201)
  create(@Body() createUserDto: CreateUserDto) {
    const user = new User()
    user.id = this.users.length + 1
    user.name = createUserDto.name
    user.age = createUserDto.age

    this.users.push(user)

    return user
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() user: User, @Res() response: Response) {
    const userToUpdateIndex = this.users.findIndex(user => user.id === id)
    this.users[userToUpdateIndex] = user

    return response.status(HttpStatus.CREATED).send()
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    this.users
      .filter(user => user.id !== Number(id))

    return true
  }
}