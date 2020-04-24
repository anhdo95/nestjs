import { Controller, Get, HttpCode, Post, Put, Redirect, Param, Body, Delete, UseFilters, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common'

import { User } from '../database/entities/user.entity'
import { ActiveUserDto } from './dto/active-user.dto'
import { CreateUserDto } from './dto/create-user-dto'
import { UsersService } from './users.service'
import { HttpExceptionFilter } from 'src/filters/http-exception.filter'


@UseFilters(HttpExceptionFilter)
@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @Get('active')
  findActiveUsers(): ActiveUserDto[] {
    return this.usersService.findActiveUsers()
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs() {}

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findById(id)
  }

  @Post()
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  create(@Body() createUserDto: CreateUserDto) {
    const user = new User()
    user.name = createUserDto.name
    user.age = createUserDto.age

    this.usersService.create(user)
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() user: User) {
    this.usersService.update(id, user)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    this.usersService.delete(id)

    return true
  }
}