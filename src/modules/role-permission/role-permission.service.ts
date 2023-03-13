import { RolePermissionEntity } from '@/entities/role_permission';
import { Injectable, HttpStatus } from '@nestjs/common';
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
    @InjectRepository(RolesEntity)
    private rolesRepository: Repository<RolesEntity>,
    private roleService: RolesService,
    private permissionsService: PermissionsService,
  ) {}

  // TODO: find all roles
  async getRolePermission(roleId: string) {
    const rolePermissions = await this.rolePermissionRepository.query(
      `
      SELECT p.name, rp."is_active", p.id
      FROM role_permission rp
      LEFT JOIN permissions p ON p.id = rp."permission_id"
      WHERE rp."role_id" = $1`,
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
      role.is_custom_role = true;
      role.inherited_from_role_id = roleDto.inherited_from_role_id;
      const roleCreated = await this.save(role);

      // save role permissions
      // const rolePermissionCreated = this.rolePermissionService.cre;

      // const rolePermissions = await this.rolePermissionService.save(
      //   this.rolePermissionService.create(permissions),
      // );

      permissions.forEach((permission) => {
        const rolePermission = new RolePermissionEntity();
        rolePermission.is_active = true;
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

  /**
   * It updates the permissions of a role by setting the is_active flag to false for all permissions
   * that are not in the permissionIds array, and then it inserts the permissionIds array into the
   * role_permission table, setting the is_active flag to true
   * @param {string} roleId - The ID of the role to update
   * @param {string[]} permissionIds - The array of permission IDs to be assigned to the role.
   */
  async updateRolePermissions(roleId: string, permissionIds: string[]) {
    const role = await this.roleService.findById(roleId);
    if (!role) {
      throw new Error(`Role with ID ${roleId} not found`);
    }

    const permissions = await this.permissionsService.findByIds(permissionIds);
    if (permissions.length !== permissionIds.length) {
      throw new Error(`One or more permission IDs not found`);
    }

    await this.rolePermissionRepository
      .createQueryBuilder()
      .update(RolePermissionEntity)
      .set({ is_active: false })
      .where(`role_id = :roleId AND permission_id NOT IN (:...permissionIds)`, {
        roleId,
        permissionIds,
      })
      .execute();

    const values = permissionIds.map((permissionId) => [
      roleId,
      permissionId,
      true,
    ]);

    const query = `
      INSERT INTO role_permission (role_id, permission_id, is_active)
      VALUES ${values
        .map(
          (_, index) =>
            `($${index * 3 + 1}, $${index * 3 + 2}, $${index * 3 + 3})`,
        )
        .join(', ')}
      ON CONFLICT (role_id, permission_id)
      DO UPDATE SET is_active = excluded.is_active
    `;
    // await this.rolePermissionRepository.manager.query(
    //   `ALTER TABLE role_permission DROP CONSTRAINT role_permission_unique_role_id_permission_id`,
    // );
    // Create a unique constraint on role_id and permission_id if it doesn't exist
    await this.rolePermissionRepository.manager.query(`
        ALTER TABLE role_permission
        ADD CONSTRAINT role_permission_unique_role_id_permission_id
        UNIQUE (role_id, permission_id);
      `);

    // Insert the data
    await this.rolePermissionRepository.manager.query(query, values.flat());
    await this.rolePermissionRepository.manager.query(
      `ALTER TABLE role_permission DROP CONSTRAINT role_permission_unique_role_id_permission_id`,
    );
    return {
      statusCode: HttpStatus.OK,
    };
  }
}
