import {
  ROLE_CREATED,
  PERMISSION_UPDATED_TO_ROLE
} from "@/common/constants/response.constants";
import { Roles } from "@/common/decorators";
import { ResponseMessage } from "@/common/decorators/response.decorator";
import { Auth } from "@/common/decorators/role.decorator";
import { UserRoles } from "@/common/interfaces/IUser";
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { CreateRoleDto } from "../roles/roles.dto";
import { RolesService } from "../roles/roles.services";
import { RolePermissionService } from "@/modules/role-permission/role-permission.service";
import { ApiTags } from "@nestjs/swagger";
import { AssignRolePermission } from "@/modules/role-permission/role-permission.dto";

@ApiTags("role-permission")
@Controller("role-permission")
export class RolePermissionController {
  constructor(
    private rolesService: RolesService,
    private rolePermissionService: RolePermissionService
  ) {
  }

  @Get(":roleId/permissions")
  async getPermissionsOfRole(
    @Param("roleId", ParseUUIDPipe)
      role_id: string
  ) {
    // const;
    const permissions = await this.rolePermissionService.getPermissionsOfRole(
      role_id
    );
    return {
      statusCode: HttpStatus.OK,
      data: permissions
    };
  }

  @Post()
  @UsePipes(ValidationPipe)
  @Roles(UserRoles.ADMIN)
  @Auth()
  @ResponseMessage(ROLE_CREATED)
  async createCustomRole(
    @Body()
      body: CreateRoleDto
  ) {
    try {
      const newRole = {
        name: body.name,
        description: body.description,
        is_custom_role: true,
        inherited_from_role_id: body.inherited_from_role_id
      };

      const roleCreated = await this.rolePermissionService.createCustomRole(
        newRole,
        body.permissions
      );
      return {
        statusCode: HttpStatus.OK,
        data: roleCreated
      };
    } catch (error) {
      throw error;
    }
  }

  @Post("/assigns")
  @UsePipes(ValidationPipe)
  // @Roles(UserRoles.ADMIN)
  // @Permissions(UserRoles.ADMIN)
  @Auth()
  // @UseGuards(JwtGuard)
  @ResponseMessage(PERMISSION_UPDATED_TO_ROLE)
  async addPermissionsToRole(
    @Body()
      body: AssignRolePermission
  ) {
    try {
      const role = await this.rolesService.findById(body?.roleId);
      if (!role) {
        throw new Error("Role not found");
      }

      await this.rolePermissionService.updateRolePermissions(
        body.roleId,
        body.permissionsIds
      );

      return {
        statusCode: HttpStatus.OK
        // data: permissions,
      };
      // update the permissions of the role
    } catch (error) {
      throw error;
    }
  }

  @Put("/test")
  async putTest() {
    return {
      data: "put test"
    };
  }
}
