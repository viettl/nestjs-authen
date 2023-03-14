import { UsersService } from './../users/users.service';
import { RolePermissionEntity } from './../../entities/role_permission';
import { UserRoleEntity } from './../../entities/user_role';
import { JwtPayload } from './../../common/interfaces/IJwtPayload';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from '@/entities/users';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(UserRoleEntity)
    private userRole: Repository<UserRoleEntity>,
    @InjectRepository(RolePermissionEntity)
    private rolePermission: Repository<RolePermissionEntity>,
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  // async validate(payload: JwtPayload): Promise<UserEntity> {
  async validate(payload: JwtPayload): Promise<any> {
    const { user_id } = payload;
    const user = await this.userRepository.findOneBy({ id: user_id });

    if (!user) {
      throw new UnauthorizedException('Email or password is incorrect.');
    }
    console.log('JwtStrategy ', user);
    const { permissions, role } = await this.usersService.getUserPermissions(
      user.id,
    );
    console.log('Passport Strategy ', permissions, role);

    // return user;
    return {
      user,
      role,
      permissions,
    };
  }
}
