import { PermissionsGuard } from './../guards/permission.guard';
import { RolesGuard } from './../guards/role.guard';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiUnauthorizedResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from '@/common/guards/jwt.guard';

export function Auth() {
  return applyDecorators(
    UseGuards(JwtGuard, RolesGuard, PermissionsGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
