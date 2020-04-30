import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'

import { UsersModule } from './modules/users/users.module'
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    autoLoadEntities: true
  }), SharedModule, AuthModule, UsersModule],
})
export class AppModule {}
