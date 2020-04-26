import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt'

import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  login(userId: number | string, name: string) {
    const found = this.usersService.findById(userId)

    if (found && found.name === name) {
      const token = this.jwtService.sign({
        user: found
      })

      return {
        token,
        user: found
      }
    }

    throw new UnauthorizedException('Your account is invalid')
  }
}