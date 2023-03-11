import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { CreatePermissionDto } from '../permissions/permissions.dto';

export class CreateRoleDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  description?: string;

  @ApiProperty()
  isCustomRole?: boolean;

  @ApiProperty()
  inheritedFromRoleId?: string;

  @ApiProperty({})
  permissions?: CreatePermissionDto[];
}

export class AddPermissionToRoleDto {
  @ApiProperty()
  @IsNotEmpty()
  permissionIds: string[];

  @ApiProperty()
  @IsNotEmpty()
  roleId: string;
}
