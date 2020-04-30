import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt'

import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, pw: string) {
    const found = await this.usersService.findByUsername(username)
    
    if (found && found.password === pw) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = found

      return result
    }

    return null
  }

  async login(user: any) {
    return {
      accessToken: this.jwtService.sign(user),
    };
  }
}