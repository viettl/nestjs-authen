import { CreateRoleDto } from './roles.dto';
import { RolesEntity } from '@/entities/roles';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from '../permissions/permissions.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RolesEntity)
    private rolesRepository: Repository<RolesEntity>,
  ) {}

  async create(roleDto: CreateRoleDto) {
    const role = new RolesEntity();
    role.name = roleDto.name;
    role.description = roleDto.description;
    const roleCreated = await this.rolesRepository.save(role);
    return roleCreated;
  }

  // TODO: find all roles
  async findAll() {
    return await this.rolesRepository.find();
  }

  async createCustomRole(
    roleDto: CreateRoleDto,
    permissions: CreatePermissionDto[],
  ) {
    const role = new RolesEntity();
    role.name = roleDto.name;
    role.description = roleDto.description;
    role.isCustomRole = true;
    role.inheritedFromRoleId = roleDto.inheritedFromRoleId;
    const roleCreated = await this.rolesRepository.save(role);
    return roleCreated;
  }
}
