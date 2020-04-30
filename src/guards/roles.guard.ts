import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler()) || []

    if (!roles.length) return true

    const request = context.switchToHttp().getRequest()
    console.log('request.user :>> ', request.user);

    if (!this.matchRoles(roles, request.user.role)) {
      throw new UnauthorizedException('You role is not authorized')
    }

    return true
  }

  matchRoles(roles: string[], roleName: string) {
    return roles.includes(roleName)
  }
}