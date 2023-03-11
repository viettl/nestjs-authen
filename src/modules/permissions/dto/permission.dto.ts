import { ApiProperty } from '@nestjs/swagger';

export class AssignPermissionDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  permissions: string[];
}
