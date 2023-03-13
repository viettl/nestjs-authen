import { Controller, Get, HttpCode, HttpStatus, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { RolesService } from './roles.services';

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
      statusCode: HttpStatus.OK,
      data: roles,
    };
  }
}
