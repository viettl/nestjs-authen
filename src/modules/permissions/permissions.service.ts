import { PermissionsEntity } from './../../entities/permissions';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(PermissionsEntity)
    private permissionRepository: Repository<PermissionsEntity>,
  ) {}

  async create(permission) {
    const permissionCreated = await this.permissionRepository.save(permission);
    return permissionCreated;
  }

  async findAll() {
    return await this.permissionRepository.find();
  }
}
