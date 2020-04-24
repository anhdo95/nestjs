import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

import { UsersModule } from './modules/users/users.module'

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { IsAuthMiddleware } from './middlewares/is-auth.middleware';

import { SharedModule } from './shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersController } from './modules/users/users.controller';

@Module({
  imports: [SharedModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(IsAuthMiddleware)
      .exclude('auth')
      .forRoutes(UsersController)
  }
}
