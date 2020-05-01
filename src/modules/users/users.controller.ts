import {
  Controller,
  Get,
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
  UseGuards,
} from '@nestjs/common';

import { User } from 'src/database/entities/user.entity';
import { CreateUserDto } from './dto/create-user-dto';
import { UsersService } from './users.service';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { Roles } from 'src/decorators/roles.decorator';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { AuthUser } from 'src/decorators/auth-user.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('users')
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
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
  findActiveUsers() {
    return this.usersService.findActiveUsers();
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs() {}

  @Get('profile')
  getProfile(@AuthUser(ValidationPipe) user: User) {
    return user
  }

  @Get(':id')
  @Roles('SuperAdmin')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @Roles('SuperAdmin')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  @Roles('SuperAdmin')
  update(@Param('id') id: number, @Body() updateUserDto: CreateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles('SuperAdmin')
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
