import { UserRoleEntity } from './../../entities/user_role';
import { RolePermissionEntity } from './../../entities/role_permission';
import { RolesEntity } from './../../entities/roles';
import { UserEntity } from './../../entities/users';
import { PermissionsEntity } from './../../entities/permissions';
import { UserRoles } from './../../common/interfaces/IUser';
import {
  P_CHANGE_PASSWORD,
  P_UPDATE_PROFILE,
} from './../../common/constants/permissions.constants';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { hashPassword } from '../../utils/password';

export class $npmConfigName1659017881377 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const hashPass = await hashPassword('123123');

    /* ------------------------------ Cleaning data ----------------------------- */

    await queryRunner.query(`DELETE FROM user_role`);
    // await queryRunner.query(`DELETE FROM roles`);
    // await queryRunner.query(`DELETE FROM permissions`);

    const userRoleRepository =
      queryRunner.connection.getRepository(UserRoleEntity);
    await userRoleRepository.createQueryBuilder().delete().execute();

    const rolePermisisonRepository =
      queryRunner.connection.getRepository(RolePermissionEntity);
    await rolePermisisonRepository.createQueryBuilder().delete().execute();

    const userRepository = queryRunner.connection.getRepository(UserEntity);
    await userRepository.createQueryBuilder().delete().execute();

    const permissionRepository =
      queryRunner.connection.getRepository(PermissionsEntity);
    await permissionRepository.createQueryBuilder().delete().execute();

    const roleRepository = queryRunner.connection.getRepository(RolesEntity);
    await roleRepository.createQueryBuilder().delete().execute();

    /* ---------------------------- Add admin account --------------------------- */

    const u_admin = await userRepository
      .createQueryBuilder()
      .insert()
      .values({
        email: 'admin@gmail.com',
        password: hashPass,
        role: UserRoles.ADMIN,
      })
      .execute();

    const u_user = await userRepository
      .createQueryBuilder()
      .insert()
      .values({
        email: 'user@gmail.com',
        password: hashPass,
        role: UserRoles.USER,
      })
      .execute();

    /* ---------------------------- Insert permissions --------------------------- */

    const p_changePass = await permissionRepository
      .createQueryBuilder()
      .insert()
      .values({
        name: P_CHANGE_PASSWORD,
        description: 'Change password',
      })
      .execute();

    const p_updateProfile = await permissionRepository
      .createQueryBuilder()
      .insert()
      .values({
        name: P_UPDATE_PROFILE,
        description: 'Change password',
      })
      .execute();

    /* ------------------------------ Insert roles ------------------------------ */

    const r_admin = await roleRepository
      .createQueryBuilder()
      .insert()
      .values({
        name: UserRoles.ADMIN,
        description: "Admin's role",
      })
      // .returning('id')
      .execute();

    const r_user = await roleRepository
      .createQueryBuilder()
      .insert()
      .values({
        name: UserRoles.USER,
        description: "User's role",
      })
      .execute();

    /* ------------------------ Assign Role to Permission ----------------------- */

    const rp_userChangePass = await rolePermisisonRepository
      .createQueryBuilder()
      .insert()
      .values({
        role: r_user.raw[0].id,
        permission: p_changePass.raw[0].id,
      })
      .execute();

    /* ------------------------ Assign permission to role ----------------------- */

    const ur_admin = await userRoleRepository
      .createQueryBuilder()
      .insert()
      .values({
        role: r_user.raw[0].id,
        user: u_user.raw[0].id,
      })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
