import {
  Controller,
  Get,
  Post,
  Body,
  UseFilters,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UseGuards,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post-dto';
import { AuthUser } from 'src/decorators/auth-user.decorator';
import { User } from 'src/database/entities/user.entity';

@Controller('posts')
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@UseInterceptors(TransformInterceptor, ClassSerializerInterceptor)
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(@Body() createPostDto: CreatePostDto, @AuthUser() user: User) {
    createPostDto.user = user

    return this.postsService.create(createPostDto);
  }
}
