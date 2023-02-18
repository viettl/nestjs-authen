import { PermissionsController } from './permissions.controller';
import { PermissionsEntity } from './../../entities/permissions';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionsEntity])],
  providers: [PermissionsService],
  exports: [PermissionsService],
  controllers: [PermissionsController],
})
export class PermissionsModule {}
