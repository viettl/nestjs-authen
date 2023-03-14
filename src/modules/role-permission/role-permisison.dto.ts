import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRoleWithPermissionsDto {
  @ApiProperty()
  @IsNotEmpty()
  role_id: string;

  @ApiProperty({})
  @IsNotEmpty()
  permissions?: any[];
}
