import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { APP_CONFIG } from "src/shared/constants";
import { Post } from "src/database/entities/post.entity";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  controllers: [PostsController],
  imports: [
    TypeOrmModule.forFeature([Post], APP_CONFIG.DB.READ),
    ClientsModule.register([
      { name: 'POSTS_SERVICE', transport: Transport.TCP }
    ])
  ],
  providers: [
    PostsService
  ],
  exports: [TypeOrmModule]
})
export class PostsModule {}