import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { APP_CONFIG, CRON_JOB } from 'src/shared/constants';
import { Post } from 'src/database/entities/post.entity';
import { CreatePostDto } from './dto/create-post-dto';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post, APP_CONFIG.DB.READ) private postRepository: Repository<Post>,
  ) {}

  findAll() {
    return this.postRepository.find({ relations: ['user'], order: { createdAt: 'DESC' } });
  }

  create(createPostDto: CreatePostDto) {
    const post = this.postRepository.create(createPostDto);

    return this.postRepository.save(post);
  }

  @Cron(CronExpression.EVERY_45_MINUTES, {
    name: CRON_JOB.SCRAP_INSTAGRAM_POSTS
  })
  scrapInstagramPosts() {
    console.log('Scrapping instagram posts')
  }
}
