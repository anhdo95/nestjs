import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt'

import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(userId: number | string, username: string) {
    const found = this.usersService.findById(userId)
    
    if (found && found.username === username) {
      return found
    }

    return null
  }

  async login(user: any) {
    console.log('user', user)
    const payload = { username: user.username, sub: user.userId };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}