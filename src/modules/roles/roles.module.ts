import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RolesEntity } from '@/entities';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.services';

@Module({
  imports: [TypeOrmModule.forFeature([RolesEntity])],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
