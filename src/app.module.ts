import { Module } from '@nestjs/common';

import { UsersModule } from './modules/users/users.module'
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [SharedModule, AuthModule, UsersModule],
})

export class AppModule {}
