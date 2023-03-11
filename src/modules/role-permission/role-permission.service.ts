import { RolePermissionEntity } from '@/entities/role_permission';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolesService } from '../roles/roles.services';
import { CreateRoleWithPermissionsDto } from './role-permisison.dto';
import { PermissionsService } from '../permissions/permissions.service';
import { CreateRoleDto } from '../roles/roles.dto';
import { RolesEntity } from '@/entities/roles';
import { CreatePermissionDto } from '../permissions/permissions.dto';

@Injectable()
export class RolePermissionService {
  constructor(
    @InjectRepository(RolePermissionEntity)
    private rolePermissionRepository: Repository<RolePermissionEntity>,

    private roleService: RolesService,

    private permissionsService: PermissionsService,
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

  async createCustomRole(
    roleDto: CreateRoleDto,
    permissions: CreatePermissionDto[],
  ) {
    try {
      // save role
      const role = new RolesEntity();
      role.name = roleDto.name;
      role.description = roleDto.description;
      role.isCustomRole = true;
      role.inheritedFromRoleId = roleDto.inheritedFromRoleId;
      const roleCreated = await this.save(role);

      // save role permissions
      // const rolePermissionCreated = this.rolePermissionService.cre;

      // const rolePermissions = await this.rolePermissionService.save(
      //   this.rolePermissionService.create(permissions),
      // );

      permissions.forEach((permission) => {
        const rolePermission = new RolePermissionEntity();
        rolePermission.isActive = true;
        rolePermission.role = roleCreated;
        rolePermission.permission = permission;
        this.save(rolePermission);
      });

      // console.log('rolePermissions', rolePermissions);
      // role.rolePermission = permissions;
      // const rolePermission = await this.rolePermissionService.save({});

      //     const projectToSave = Project.create(project);
      // await projectToSave.save();

      // const projectUsers = ProjectUser.create(project.projectUsers);
      // projectUsers.forEach(p => p.project = projectToSave);
      // await projectUsers.save(projectUsers);
      // return projectToSave;

      return roleCreated;
    } catch (error) {
      throw error;
    }
  }

  async getPermissionsOfRole(roleId: string) {
    return await this.getRolePermission(roleId);
  }

  // add/remove/modify the permissions of a role
  async updateRolePermissions(
    roleId: string,
    permissionIds: CreateRoleWithPermissionsDto[],
  ) {
    const role = await this.roleService.findById(roleId);
    if (!role) {
      throw new Error(`Role with ID ${roleId} not found`);
    }

    const permissions = await this.permissionsService.findByIds(permissionIds);
    if (permissions.length !== permissionIds.length) {
      throw new Error(`One or more permission IDs not found`);
    }

    const role11 = await this.roleService.findOneOrFail(roleId, {
      relations: ['rolePermission', 'rolePermission.permission'],
    });
    console.log(
      '🚀 ~ file: role-permission.service.ts:70 ~ RolePermissionService ~ role11:',
      role11,
    );

    /**
     const existingPermissionIds = role.permissions.map(permission => permission.id);
    const newPermissionIds = permissionIds.filter(permissionId => !existingPermissionIds.includes(permissionId));
    const removedPermissionIds = existingPermissionIds.filter(permissionId => !permissionIds.includes(permissionId));

    if (newPermissionIds.length > 0) {
      const newPermissions = await this.permissionRepository.findByIds(newPermissionIds);
      role.permissions = [...role.permissions, ...newPermissions];

      const rolePermissionRecords = newPermissions.map(permission => ({ roleId, permissionId: permission.id }));
      await this.rolePermissionRepository.insert(rolePermissionRecords);
    }

    if (removedPermissionIds.length > 0) {
      role.permissions = role.permissions.filter(permission => !removedPermissionIds.includes(permission.id));

      await this.rolePermissionRepository.delete({ roleId, permissionId: removedPermissionIds });
    }

    await this.roleRepository.save(role);
    
    */
  }
}
