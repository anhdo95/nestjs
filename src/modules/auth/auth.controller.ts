import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common'

import { AuthService } from './auth.service'
import { LoginUserDto } from './dto/login-user.dto'
import { AuthGuard } from '@nestjs/passport'
import { LocalAuthGuard } from 'src/guards/local-auth.guard'
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard'

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Req() req) {
    console.log('req', req)
    return this.authService.login(req.user)
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Req() req: any) {
    req.user = null
  }
}
