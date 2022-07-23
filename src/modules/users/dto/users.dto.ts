import { Gender, UserRoles } from '../../../common/interfaces/IUser';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseDto } from 'src/common/bases/base.dto';
import { UserEntity } from 'src/entities/users';

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
