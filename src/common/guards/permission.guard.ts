import { PermissionsEntity } from '@/entities';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators';
import { UserRoles } from '../interfaces/IUser';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const {
      user: { user, role, permissions },
    } = context.switchToHttp().getRequest();

    const requiredPermissions = this.reflector.getAllAndOverride<
      PermissionsEntity[]
    >(PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredPermissions) {
      return true;
    }

    if (role === UserRoles.ADMIN) return true;

    return requiredPermissions.some((permission) => {
      if (permissions.filter((per) => per.name === permission).length > 0) {
        return true;
      }
    });
  }
}
