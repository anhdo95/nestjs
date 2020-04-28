import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { Injectable, UnauthorizedException } from '@nestjs/common'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super()
  }

  async validate(userId: string, username: string): Promise<any> {
    console.log('userId', userId)
    const user = await this.authService.validateUser(userId, username);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}