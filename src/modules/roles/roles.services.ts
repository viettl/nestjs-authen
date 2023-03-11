import { BaseService } from '@/common/bases/base.service';
import { RolesEntity } from '@/entities/roles';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateRoleDto } from './roles.dto';

@Injectable()
export class RolesService extends BaseService<RolesEntity> {
  constructor(
    @InjectRepository(RolesEntity)
    private rolesRepository: Repository<RolesEntity>,
  ) {
    super(rolesRepository);
  }

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
}
