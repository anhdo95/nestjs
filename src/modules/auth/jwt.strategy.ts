import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";

import { jwtConfig } from 'src/shared/constants'

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secret
    })
  }

  async validate(payload: any) {
    console.log('payload', payload)
    return { userId: payload.userId, sub: payload.sub }
  }
}