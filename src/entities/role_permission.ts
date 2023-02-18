import BaseEntity from './../common/bases/base.entity';
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { RolesEntity } from './roles';
import { PermissionsEntity } from './permissions';

@Entity({
  name: 'role_permission',
})
export class RolePermissionEntity extends BaseEntity {
  @Column({ default: true })
  isActive!: boolean;

  @ManyToOne(
    (type) => RolesEntity,
    (role: RolesEntity) => role.rolePermission,
    {
      cascade: true,
    },
  )
  @JoinColumn({ name: 'roleId' })
  role: RolesEntity;

  @ManyToOne(
    (type) => PermissionsEntity,
    (permit: PermissionsEntity) => permit.rolePermission,
    {
      cascade: true,
    },
  )
  @JoinColumn({ name: 'permissionId' })
  permission: Partial<PermissionsEntity>;
}
