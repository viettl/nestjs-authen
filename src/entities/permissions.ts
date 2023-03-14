import { BaseEntity } from '../common/bases/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { RolePermissionEntity } from './role_permission';

@Entity({ name: 'permissions' })
export class PermissionsEntity extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(
    () => RolePermissionEntity,
    (permission: RolePermissionEntity) => permission.permission,
  )
  role_permission!: RolePermissionEntity[];
}
