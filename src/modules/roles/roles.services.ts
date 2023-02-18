import { RolePermissionEntity } from '@/entities/role_permission';
import { CreateRoleDto } from './roles.dto';
import { RolesEntity } from '@/entities/roles';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from '../permissions/permissions.dto';
import { RolePermissionService } from '../role-permission/role-permission.service';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RolesEntity)
    private rolesRepository: Repository<RolesEntity>,

    private rolePermissionService: RolePermissionService,
  ) {}

  async create(roleDto: CreateRoleDto) {
    const role = new RolesEntity();
    role.name = roleDto.name;
    role.description = roleDto.description;
    const roleCreated = await this.rolesRepository.save(role);
    return roleCreated;
  }

  // TODO: find all roles
  async findAll() {
    return await this.rolesRepository.find();
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
      const roleCreated = await this.rolesRepository.save(role);

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
        this.rolePermissionService.save(rolePermission);
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
    return await this.rolePermissionService.getRolePermission(roleId);
  }
}
