import { RolePermissionService } from './../role-permission/role-permission.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.services';
import { Request } from 'express';
import { Roles } from '@/common/decorators';
import { UserRoles } from '@/common/interfaces/IUser';
import { Auth } from '@/common/decorators/role.decorator';
import { ResponseMessage } from '@/common/decorators/response.decorator';
import { ROLE_CREATED } from '../../common/constants/response.constants';
import { CreateRoleDto } from './roles.dto';

@Controller('roles')
@ApiTags('Roles')
@ApiBearerAuth()
export class RolesController {
  constructor(
    private rolesService: RolesService,
    private rolePermissionService: RolePermissionService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getRoles(@Req() req: Request) {
    const roles = await this.rolesService.findAll();
    console.log(roles);
    return {
      data: roles,
    };
  }

  @Get(':roleId/permissions')
  async getPermissionsOfRole(@Param('roleId', ParseUUIDPipe) roleId: string) {
    // const;
    const permissions = await this.rolesService.getPermissionsOfRole(roleId);
    return {
      data: permissions,
    };
  }

  @Post()
  @UsePipes(ValidationPipe)
  @Roles(UserRoles.ADMIN)
  @Auth()
  @ResponseMessage(ROLE_CREATED)
  async createCustomRole(@Body() body: CreateRoleDto) {
    try {
      const newRole = {
        name: body.name,
        description: body.description,
        isCustomRole: true,
        inheritedFromRoleId: body.inheritedFromRoleId,
      };

      const roleCreated = await this.rolesService.createCustomRole(
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
}
