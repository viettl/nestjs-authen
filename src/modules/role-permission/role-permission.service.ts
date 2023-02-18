import { RolePermissionEntity } from '@/entities/role_permission';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleWithPermissionsDto } from './role-permisison.dto';

@Injectable()
export class RolePermissionService {
  constructor(
    @InjectRepository(RolePermissionEntity)
    private rolePermissionRepository: Repository<RolePermissionEntity>,
  ) {}

  // TODO: find all roles
  async getRolePermission(roleId: string) {
    const rolePermissions = await this.rolePermissionRepository.query(
      `
      SELECT p.name, rp."isActive", p.id
      FROM role_permission rp
      LEFT JOIN permissions p ON p.id = rp."permissionId"
      WHERE rp."roleId" = $1`,
      [roleId],
    );
    return rolePermissions;
  }

  async createRoleWithPermissions(
    createRolePermissionDto: CreateRoleWithPermissionsDto,
  ) {
    // const rolePermission = new RolePermissionEntity();
    // rolePermission.isActive = true;
    // rolePermission.role = [];
    // rolePermission.permission = [];
    // const rolePermissionCreated = await this.rolePermissionRepository.save(rolePermission);
    // return rolePermissionCreated;
  }

  create(data) {
    return this.rolePermissionRepository.create(data);
  }

  async save(data) {
    return await this.rolePermissionRepository.save(data);
  }
}
