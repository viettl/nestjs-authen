import { RolesEntity } from './../../entities/roles';
import { UserRoleEntity } from './../../entities/user_role';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@/entities/users';
import { Injectable } from '@nestjs/common';
import { Optional } from '@/common/interfaces/ITypes';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/users.dto';
import { comparePassword, hashPassword } from '@/utils/password';
import { UserRoles } from '@/common/interfaces/IUser';
import { RolePermissionService } from '../role-permission/role-permission.service';
import { UserRoleService } from '../user-role/user-role.service';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    private userRoleService: UserRoleService,

    @InjectRepository(RolesEntity)
    private roleRepository: Repository<RolesEntity>,

    private rolePermissionServices: RolePermissionService,
  ) {}

  async createUserRole(data) {
    //
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOneBy({
      email,
    });
    return user;
  }

  // async create(userData: CreateUserDto): Promise<any> {
  async create(userData: any): Promise<any> {
    const { email, password } = userData;

    const user = new UserEntity();

    user.email = email;

    try {
      // user.salt = await bcrypt.genSalt();
      user.password = await hashPassword(password);
      const userRole = new UserRoleEntity();
      userRole.user = user;
      const role = await this.roleRepository.findOneBy({
        id: '41dcf32b-c28f-4d01-bd4f-9577911bac7a',
      });
      // const role = new RolesEntity();
      // role.id = '41dcf32b-c28f-4d01-bd4f-9577911bac7a';
      userRole.role = role;
      await userRole.save();
      return userRole.id;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<Optional<UserEntity>> {
    const user = await this.userRepository.findOneBy({
      id,
    });
    if (!user) {
      //
    }
    return user;
  }

  async validateUserPassword(loginData: LoginDto): Promise<string | null> {
    const { email, password } = loginData;
    const user = await this.userRepository.findOneBy({ email });

    if (user && (await comparePassword(password, user.password))) {
      return user.id;
    }
    return null;
  }

  /**
   *
   * @param user_id
   * @returns
   */
  async getUserPermissions(
    user_id: string,
  ): Promise<{ permissions: []; role: string }> {
    const userRoles = await this.userRoleService.getUserRole(user_id);
    // Except for Admin, check all roles
    if (userRoles.length !== 0 && userRoles[0].name !== UserRoles.ADMIN) {
      const permissions = await this.rolePermissionServices.getRolePermission(
        userRoles[0].id,
      );
      return {
        permissions,
        role: userRoles[0].name,
      };
    }
    return {
      permissions: [],
      role: UserRoles.ADMIN,
    };
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.userRepository.createQueryBuilder().getMany();
    return users;
  }
}
