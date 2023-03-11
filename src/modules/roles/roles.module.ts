import { RolesEntity } from '@/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolesController } from './roles.controller';
import { RolesService } from './roles.services';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RolesEntity,
      // PermissionsEntity,
      // RolePermissionEntity,
    ]),
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
