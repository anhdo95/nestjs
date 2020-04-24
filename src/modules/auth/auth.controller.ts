import { Controller, Post, Body } from '@nestjs/common'

import { AuthService } from './auth.service'
import { LoginUserDto } from './dto/login-user.dto'

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto.id, loginUserDto.name)
  }

  @Post('logout')
  logout(@Body() loginUserDto: LoginUserDto) {
    return this.authService.logout(loginUserDto.id, loginUserDto.name)
  }
}
