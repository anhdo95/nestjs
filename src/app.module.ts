import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { MongooseModule } from '@nestjs/mongoose'

import { UsersModule } from './modules/users/users.module'
import { EventsModule } from './modules/events/events.module'
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('MYSQL_HOST'),
        port: configService.get('MYSQL_PORT'),
        username: configService.get('MYSQL_USERNAME'),
        password: configService.get('MYSQL_PASSWORD'),
        database: configService.get('MYSQL_DATABASE'),
        entities: [__dirname + '/**/*.entity{ .ts,.js}'],
        synchronize: true,
      }),
    }),
    MongooseModule.forRoot('mongodb://nestjs:123456@localhost:27017/nestjs_test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'mongodb',
    //     host: configService.get('MONGO_HOST'),
    //     port: configService.get('MONGO_PORT'),
    //     username: configService.get('MONGO_USERNAME'),
    //     password: configService.get('MONGO_PASSWORD'),
    //     database: configService.get('MONGO_DATABASE'),
    //     entities: [__dirname + '/**/*.schema{ .ts,.js}'],
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true
    //   })
    // }),
    SharedModule,
    AuthModule,
    UsersModule,
    EventsModule,
  ],
})
export class AppModule {}
