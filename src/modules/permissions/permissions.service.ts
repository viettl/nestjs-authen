import { PermissionsEntity } from './../../entities/permissions';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '@/common/bases/base.service';

@Injectable()
export class PermissionsService extends BaseService<PermissionsEntity> {
  constructor(
    @InjectRepository(PermissionsEntity)
    private permissionRepository: Repository<PermissionsEntity>,
  ) {
    super(permissionRepository);
  }

  async create(permission) {
    const permissionCreated = await this.permissionRepository.save(permission);
    return permissionCreated;
  }

  async findAll() {
    return await this.permissionRepository.find();
  }
}
