import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const ROLES_KEY = 'roles';
export const PERMISSIONS_KEY = 'permissions';
export const ABILITY_KEY = 'ability';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const Roles = (...roles: any[]) => SetMetadata(ROLES_KEY, roles);

export const Permissions = (...permissions: any[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);

export const Check_Ability = (...requirement: any[]) =>
  SetMetadata(ABILITY_KEY, requirement);
