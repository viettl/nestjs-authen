import { UserRoleEntity } from './../../entities/user_role';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRoleEntity)
    private userRoleRepository: Repository<UserRoleEntity>,
  ) {}

  async getUserRole(userId: string) {
    const userRoles = await this.userRoleRepository.query(
      `
      SELECT r.id, r.name
      FROM user_role ur
      LEFT JOIN roles r ON r.id = ur."roleId"
      WHERE ur."userId" = $1`,
      [userId],
    );

    return userRoles;
  }
}
