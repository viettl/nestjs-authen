import { RolesEntity } from '@/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PermissionsModule } from '../permissions/permissions.module';
import { RolesModule } from '../roles/roles.module';
import { RolePermissionEntity } from './../../entities/role_permission';
import { RolePermissionController } from './role-permission.controller';
import { RolePermissionService } from './role-permission.service';

@Module({
  imports: [
    RolesModule,
    PermissionsModule,
    TypeOrmModule.forFeature([RolePermissionEntity, RolesEntity]),
    // forwardRef(() => RolesModule),
    // forwardRef(() => PermissionsModule),
  ],
  controllers: [RolePermissionController],
  providers: [RolePermissionService],
  exports: [RolePermissionService],
})
export class RolePermissionModule {}
