import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermissionEntity } from './../../entities/role_permission';
import { Module } from '@nestjs/common';
import { RolePermissionService } from './role-permission.service';

@Module({
  imports: [TypeOrmModule.forFeature([RolePermissionEntity])],
  providers: [RolePermissionService],
  exports: [RolePermissionService],
})
export class RolePermissionModule {}
