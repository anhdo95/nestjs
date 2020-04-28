import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
// import { IsAuthMiddleware } from 'src/middlewares/is-auth.middleware';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/shared/constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [AuthController],
  imports: [PassportModule, JwtModule.register({
    secret: jwtConfig.secret,
    signOptions: { expiresIn: '24h' }
  })],
  providers: [AuthService, UsersService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(IsAuthMiddleware)
  //     .forRoutes({ path: 'auth/logout', method: RequestMethod.POST });
  // }
}
