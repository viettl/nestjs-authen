import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../constants/auth-meta.constant';
import { UserRoles } from '../interfaces/IUser';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const {
      user,
      user: { role },
    } = request;

    // auto grant access to admins
    if (role === UserRoles.ADMIN) return true;
    // const hasRole = () =>
    //   role.some((role) => !!roles.find((item) => item === role));
    const hasRole = () => roles.includes(role);
    return user && role && hasRole();
  }
}
