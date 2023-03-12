import {
  ROLE_CREATED,
  PERMISSION_ADDED_TO_ROLE,
} from '@/common/constants/response.constants';
import { Permissions, Roles } from '@/common/decorators';
import { ResponseMessage } from '@/common/decorators/response.decorator';
import { Auth } from '@/common/decorators/role.decorator';
import { UserRoles } from '@/common/interfaces/IUser';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateRoleDto } from '../roles/roles.dto';
import { RolesService } from '../roles/roles.services';
import { RolePermissionService } from '@/modules/role-permission/role-permission.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('role-permission')
@Controller('role-permission')
export class RolePermissionController {
  constructor(
    private rolesService: RolesService,
    private rolePermissionService: RolePermissionService,
  ) {}

  @Get(':roleId/permissions')
  async getPermissionsOfRole(
    @Param('roleId', ParseUUIDPipe)
    roleId: string,
  ) {
    // const;
    const permissions = await this.rolePermissionService.getPermissionsOfRole(
      roleId,
    );
    return {
      data: permissions,
    };
  }

  @Post()
  @UsePipes(ValidationPipe)
  @Roles(UserRoles.ADMIN)
  @Auth()
  @ResponseMessage(ROLE_CREATED)
  async createCustomRole(
    @Body()
    body: CreateRoleDto,
  ) {
    try {
      const newRole = {
        name: body.name,
        description: body.description,
        isCustomRole: true,
        inheritedFromRoleId: body.inheritedFromRoleId,
      };

      const roleCreated = await this.rolePermissionService.createCustomRole(
        newRole,
        body.permissions,
      );

      const rolePermissionsCreated =
        await this.rolePermissionService.createRoleWithPermissions({
          roleId: roleCreated.id,
          permissions: body.permissions,
        });

      return {
        data: roleCreated,
      };
    } catch (error) {
      throw error;
    }
  }

  @Post('/assigns')
  // @UsePipes(ValidationPipe)
  @Roles(UserRoles.ADMIN)
  @Permissions(UserRoles.ADMIN)
  @Auth()
  // @UseGuards(JwtGuard)
  @ResponseMessage(PERMISSION_ADDED_TO_ROLE)
  async addPermissionsToRole(
    @Body()
    body: any,
  ) {
    try {
      const role = this.rolesService.findById(body?.roleId);
      if (!role) {
        throw new Error('Role not found');
      }

      return {
        statusCode: HttpStatus.OK,
        // data: permissions,
      };
      // update the permissions of the role
    } catch (error) {
      throw error;
    }
  }
}
