import { Entity, JoinColumn, ManyToOne, Column } from 'typeorm';
import { RolesEntity } from './roles';
import { UserEntity } from './users';
import { BaseEntity } from '../common/bases/base.entity';

@Entity({ name: 'user_role' })
export class UserRoleEntity extends BaseEntity {
  @Column({ default: true })
  is_active!: boolean;

  @ManyToOne((type) => RolesEntity, (role: RolesEntity) => role.user_role, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: 'role_id' })
  // @JoinColumn()
  role: RolesEntity;

  @ManyToOne((type) => UserEntity, (user: UserEntity) => user.user_role, {
    cascade: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}

/**
When you want to get a list of permission values for a user:
select distinct p.name
  from user_role ur
  join role_permission rp on rp.role_id = ur.role_id
  join permission p on p.permission_id = rp.permission_id
 where ur.user_id = 123;
*/
