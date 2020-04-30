import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'

import { UsersModule } from './modules/users/users.module'
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';
import { User } from './database/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "123456",
    "database": "nestjs_test",
    "entities": [User],
    "synchronize": true
  }), SharedModule, AuthModule, UsersModule],
})
export class AppModule {}
