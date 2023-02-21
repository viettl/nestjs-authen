import { SetMetadata } from '@nestjs/common';
import {
  IS_PUBLIC_KEY,
  ROLES_KEY,
  PERMISSIONS_KEY,
  ABILITY_KEY,
} from '../constants/auth-meta.constant';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const Roles = (...roles: any[]) => SetMetadata(ROLES_KEY, roles);

export const Permissions = (...permissions: any[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);

export const Check_Ability = (...requirement: any[]) =>
  SetMetadata(ABILITY_KEY, requirement);
