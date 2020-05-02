import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { APP_CONFIG } from 'src/shared/constants';
import { Post } from 'src/database/entities/post.entity';
import { CreatePostDto } from './dto/create-post-dto';

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
}
