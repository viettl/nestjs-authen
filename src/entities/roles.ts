import { RolePermissionEntity } from './role_permission';
import { UserRoleEntity } from './user_role';
import { BaseEntity } from '../common/bases/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'roles' })
export class RolesEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ default: false })
  is_custom_role!: boolean;

  @OneToMany(() => UserRoleEntity, (userRole: UserRoleEntity) => userRole.role)
  // @JoinColumn({ referencedColumnName: 'role_id' })
  user_role!: Partial<UserRoleEntity>[];

  @OneToMany(
    () => RolePermissionEntity,
    (permission: RolePermissionEntity) => permission.role,
    {
      // cascade: true,
    },
  )
  role_permission!: RolePermissionEntity[];

  @Column({ nullable: true })
  description: string;

  // role inherit from other role -> use for custom role purpose
  @Column({ nullable: true })
  inherited_from_role_id!: string;
}
