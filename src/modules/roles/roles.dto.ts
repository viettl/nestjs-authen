import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

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
}
