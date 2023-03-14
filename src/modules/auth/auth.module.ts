import { PermissionsEntity } from '@/entities';
import { RefreshTokenEntity } from '@/entities/refresh-token';
import { RolesEntity } from '@/entities/roles';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRoleEntity } from '../../entities/user_role';
import { UserEntity } from '../../entities/users';
import { UserModule } from '../users/users.module';
import { RolePermissionEntity } from './../../entities/role_permission';
import { AuthController } from './auth.controllder';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    TypeOrmModule.forFeature([
      UserEntity,
      RefreshTokenEntity,
      UserRoleEntity,
      RolesEntity,
      RolePermissionEntity,
      PermissionsEntity,
    ]),
  ],
  providers: [
    JwtStrategy,
    AuthService,
    JwtService,
    // UsersService,
    // RolePermissionService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: TransformInterceptor,
    // },
  ],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
