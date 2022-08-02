import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.services';
import { Request } from 'express';
import { Roles } from '@/common/decorators';
import { UserRoles } from '@/common/interfaces/IUser';
import { Auth } from '@/common/decorators/role.decorator';

@Controller('roles')
@ApiTags('Roles')
@ApiBearerAuth()
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getRoles(@Req() req: Request) {
    const roles = await this.rolesService.findAll();
    console.log(roles);
    return {
      data: roles,
    };
  }

  @Get(':roleId')
  async getPermissionsOfRole(@Param('roleId', ParseUUIDPipe) roleId: string) {
    // const;
    // const permissions = await this.rolesService.getPermissionsOfRole();
    // return res.json({ permissions });
  }

  @Post()
  @Roles(UserRoles.ADMIN)
  @Auth()
  async createCustomRole(@Req() req: Request) {
    const roleCreated = this.rolesService.createCustomRole(
      req.body.role,
      req.body.permissions,
    );
    return roleCreated;
  }
}
