import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserRoleEntity } from '@/entities';
import { UserRoleService } from './user-role.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRoleEntity])],
  providers: [UserRoleService],
  exports: [UserRoleService],
})
export class UserRoleModule {}
