import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RolesEntity } from '@/entities';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.services';
import { RolePermissionModule } from '../role-permission/role-permisison.module';

@Module({
  imports: [TypeOrmModule.forFeature([RolesEntity]), RolePermissionModule],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
