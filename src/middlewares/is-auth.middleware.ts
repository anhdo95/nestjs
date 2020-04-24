import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class IsAuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: any, res: any, next: Function) {
    if (req.headers.authorization) {
      try {
        const [_, token] = req.headers.authorization.split(' ')
  
        const decoded = this.jwtService.verify(token)
  
        req.user = decoded.user
        next()
      } catch (error) {
        throw new UnauthorizedException('Your token is not valid')       
      }
    } else {
      throw new UnauthorizedException()
    }
  }
}