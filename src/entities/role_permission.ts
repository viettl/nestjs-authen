import BaseEntity from './../common/bases/base.entity';
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { RolesEntity } from './roles';
import { PermissionsEntity } from './permissions';

@Entity({
  name: 'role_permission',
})
export class RolePermissionEntity extends BaseEntity {
  @Column({ default: true })
  is_active!: boolean;

  @ManyToOne(
    (type) => RolesEntity,
    (role: RolesEntity) => role.role_permission,
    {
      cascade: true,
    },
  )
  @JoinColumn({ name: 'role_id' })
  role: RolesEntity;

  @ManyToOne(
    (type) => PermissionsEntity,
    (permit: PermissionsEntity) => permit.role_permission,
    {
      cascade: true,
    },
  )
  @JoinColumn({ name: 'permission_id' })
  permission: Partial<PermissionsEntity>;
}
