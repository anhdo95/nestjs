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
  UploadedFile,
  Param,
  Res,
  Inject,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express'

import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post-dto';
import { AuthUser } from 'src/decorators/auth-user.decorator';
import { User } from 'src/database/entities/user.entity';
import { MessagePattern, EventPattern, ClientProxy } from '@nestjs/microservices';

@Controller('posts')
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@UseInterceptors(TransformInterceptor, ClassSerializerInterceptor)
export class PostsController {
  constructor(
    private postsService: PostsService,
    @Inject('POSTS_SERVICE') private client: ClientProxy
  ) {}

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

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    dest: process.env.DEFAULT_UPLOAD_DEST
  }))
  uploadFile(@UploadedFile() file) {
    return file.path
  }

  @Get('public/:fileId')
  serveStaticFile(@Param('fileId') fileId: string, @Res() res) {
    return res.sendFile(fileId, { root: process.env.DEFAULT_UPLOAD_DEST })
  }

  @MessagePattern({ cmd: 'sum' })
  accumulate(data: number[]) {
    return data.reduce((sum, number) => sum + number)
  }

  testMessage() {
    const pattern = { cmd: 'sum' }
    const payload = [1, 2, 3]

    return this.client.send(pattern, payload)
  }

  @EventPattern('post_created')
  handlePostCreated(data: Record<string, unknown>) {
    console.log('Handle business', data)
  }

  testEvent() {
    const pattern = { cmd: 'post_created' }
    const payload = new CreatePostDto()

    return this.client.emit(pattern, payload)
  }
}
