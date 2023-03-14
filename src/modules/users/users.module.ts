import { UserRoleModule } from './../user-role/user-role.module';
import { RolesEntity } from '@/entities/roles';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from '@/entities/users';
import { UsersController } from './users.controller';
import { RolePermissionModule } from '../role-permission/role-permisison.module';

@Module({
  imports: [
    RolePermissionModule,
    UserRoleModule,
    TypeOrmModule.forFeature([UserEntity, RolesEntity]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UserModule {}
