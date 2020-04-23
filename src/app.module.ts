import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersController } from './modules/users/users.controller';
import { AppService } from './app.service';
import { UsersService } from './modules/users/users.service';

@Module({
  imports: [],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {}
