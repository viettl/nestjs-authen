import { UserRoleEntity } from './user_role';
import { Gender, UserRoles } from '../common/interfaces/IUser';
import { Exclude } from 'class-transformer';
import { IsString, MaxLength } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../common/bases/base.entity';

@Entity({ name: 'users' })
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

  @OneToMany(() => UserRoleEntity, (role: UserRoleEntity) => role.user, {})
  // @JoinColumn({ referencedColumnName: 'userId' })
  // @JoinColumn()
  // { referencedColumnName: 'userId' }
  user_role!: Partial<UserRoleEntity>[];

  @Column({ unique: true, nullable: true })
  phone_number: string;

  @Column({ nullable: true })
  is_modified_role: boolean;
}
