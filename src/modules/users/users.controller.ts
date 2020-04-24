import { Controller, Get, Req, HttpCode, Post, Put, Res, Redirect, Param, Body, Delete, HttpStatus, Inject, UseFilters, HttpException, NotFoundException, UsePipes, ValidationPipe } from '@nestjs/common'
import { Request, Response } from 'express'

import { User } from '../database/entities/user.entity'
import { ActiveUserDto } from './dto/active-user.dto'
import { CreateUserDto } from './dto/create-user-dto'
import { UsersService } from './users.service'
import { HttpExceptionFilter } from 'src/filters/http-exception.filter'
import { JoiValidationPipe } from '../../pipes/joi-validation.pipe'


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
  findById(@Param('id') id: string) {
    return this.usersService.findById(id)
  }

  @Post()
  @HttpCode(201)
  // @UsePipes(new ValidationPipe(createUserDto))
  create(@Body(JoiValidationPipe) createUserDto: CreateUserDto) {
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