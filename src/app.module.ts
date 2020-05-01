import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'

import { UsersModule } from './modules/users/users.module'
import { EventsModule } from './modules/events/events.module'
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigService } from '@nestjs/config';
import { APP_CONFIG } from './shared/constants';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      name: APP_CONFIG.DB.READ,
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('MYSQL_HOST'),
        port: configService.get('MYSQL_PORT'),
        username: configService.get('MYSQL_USERNAME'),
        password: configService.get('MYSQL_PASSWORD'),
        database: configService.get('MYSQL_DATABASE'),
        entities: [__dirname + '/database/entities/**/*.entity{ .ts,.js}'],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      name: APP_CONFIG.DB.WRITE,
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        host: configService.get('MONGO_HOST'),
        port: configService.get('MONGO_PORT'),
        username: configService.get('MONGO_USERNAME'),
        password: configService.get('MONGO_PASSWORD'),
        database: configService.get('MONGO_DATABASE'),
        entities: [__dirname + '/database/mongo-entities/**/*.entity{ .ts,.js}'],
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
    }),
    SharedModule,
    AuthModule,
    UsersModule,
    EventsModule,
  ],
})
export class AppModule {}
