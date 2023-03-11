import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRoleWithPermissionsDto {
  @ApiProperty()
  @IsNotEmpty()
  roleId: string;

  @ApiProperty({})
  @IsNotEmpty()
  permissions?: any[];
}
