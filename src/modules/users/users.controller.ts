import {
  Controller,
  Get,
  HttpCode,
  Post,
  Put,
  Redirect,
  Param,
  Body,
  Delete,
  UseFilters,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
} from '@nestjs/common';

import { User } from '../database/entities/user.entity';
import { ActiveUserDto } from './dto/active-user.dto';
import { CreateUserDto } from './dto/create-user-dto';
import { UsersService } from './users.service';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { Roles } from 'src/decorators/roles.decorator';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { AuthUser } from 'src/decorators/auth-user.decorator';

@Controller('users')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(TransformInterceptor)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @Roles('SuperAdmin')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('active')
  @Roles('SuperAdmin')
  findActiveUsers(): ActiveUserDto[] {
    return this.usersService.findActiveUsers();
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs() {}

  @Get('profile')
  getProfile(@AuthUser() user) {
    return user
  }

  @Get(':id')
  @Roles('SuperAdmin')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findById(id);
  }

  @Post()
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  @Roles('SuperAdmin')
  create(@Body() createUserDto: CreateUserDto) {
    const user = new User();
    user.name = createUserDto.name;
    user.age = createUserDto.age;

    this.usersService.create(user);
  }

  @Put(':id')
  @Roles('SuperAdmin')
  update(@Param('id') id: number, @Body() user: User) {
    this.usersService.update(id, user);
  }

  @Delete(':id')
  @Roles('SuperAdmin')
  delete(@Param('id') id: string) {
    this.usersService.delete(id);

    return true;
  }
}
