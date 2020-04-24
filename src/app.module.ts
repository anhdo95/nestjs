import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

import { UsersModule } from './modules/users/users.module'

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { IsAuthMiddleware } from './middlewares/is-auth.middleware';

import { UsersController } from './modules/users/users.controller';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [SharedModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(IsAuthMiddleware)
      .forRoutes(UsersController)
  }
}
