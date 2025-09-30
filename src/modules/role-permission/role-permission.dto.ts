import { IsNotEmpty, IsEmail, IsString, ArrayMinSize } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  password: string;
}

export class AssignRolePermission {
  @ApiProperty()
  @IsNotEmpty()
  roleId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString({ each: true })
  @ArrayMinSize(1)
  permissionsIds: string[];
}
