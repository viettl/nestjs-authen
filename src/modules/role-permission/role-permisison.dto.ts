import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreatePermissionDto } from '../permissions/permissions.dto';

export class CreateRoleWithPermissionsDto {
  @ApiProperty()
  @IsNotEmpty()
  roleId: string;

  @ApiProperty({})
  @IsNotEmpty()
  permissions?: CreatePermissionDto[];
}
