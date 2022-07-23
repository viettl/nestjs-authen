import { Exclude, } from 'class-transformer';
import { IsString, MaxLength } from 'class-validator';
import BaseEntity from 'src/common/base.entity';
import { Gender, UserRoles } from 'src/interfaces/IUser';
import { Column, Entity } from 'typeorm';

@Entity()
export class UserEntity extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column({ nullable: true })
  password: string;

  @Column({ unique: true, nullable: true })
  username: string;

  @Exclude()
  @Column({ nullable: true })
  salt: string;

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.MALE,
  })
  gender: Gender;

  @MaxLength(100, { always: true })
  @IsString({ always: true })
  @Column({ type: 'varchar', length: 100, nullable: true })
  name: string;

  //

  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.USER })
  role: UserRoles;
  @Column({ unique: true, nullable: true })
  phoneNumber: string;
}
