import { Gender, UserRoles } from '../../../common/interfaces/IUser';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseDto } from 'src/common/bases/base.dto';
import { UserEntity } from 'src/entities/users';
import { IsString } from 'class-validator';

export class UserDto extends BaseDto {
  @ApiPropertyOptional()
  username: string;

  @ApiPropertyOptional({ enum: UserRoles })
  role: UserRoles;

  @ApiPropertyOptional()
  email: string;

  @ApiPropertyOptional({ enum: Gender })
  gender: Gender;

  @ApiPropertyOptional()
  phoneNumber: string;

  constructor(user: UserEntity) {
    super(user);
    this.username = user.username;
    this.role = user.role;
    this.email = user.email;
    this.gender = user.gender;
    this.phoneNumber = user.phoneNumber;
  }
}

export class Password {
  @ApiProperty()
  @IsString()
  password: string;
}

export class CreateUserDto extends Password {
  @ApiProperty()
  @IsString()
  email: string;
}

export class LoginDto extends Password {
  @ApiProperty()
  @IsString()
  email: string;
}

export class CredentialDto extends Password {
  id: string;
}
