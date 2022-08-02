import { RolePermissionEntity } from '@/entities/role_permission';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
      SELECT p.name, rp."isActive"
      FROM role_permission rp
      LEFT JOIN permissions p ON p.id = rp."permissionId"
      WHERE rp."roleId" = $1`,
      [roleId],
    );
    return rolePermissions;
  }
}
