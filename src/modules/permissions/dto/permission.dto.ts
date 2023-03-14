import { ApiProperty } from '@nestjs/swagger';

export class AssignPermissionDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  permissions: string[];
}

export class CreatePermissionDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
}
