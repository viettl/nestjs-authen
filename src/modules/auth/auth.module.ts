import { RolePermissionEntity } from './../../entities/role_permission';
import { AuthController } from './auth.controllder';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { RefreshTokenEntity } from '@/entities/refresh-token';
import { JwtService } from '@nestjs/jwt';
import { UserRoleEntity } from '../../entities/user_role';
import { UserEntity } from '../../entities/users';
import { RolesEntity } from '@/entities/roles';
import { RolePermissionService } from '../role-permission/role-permission.service';
import { UserModule } from '../users/users.module';

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
    ]),
  ],
  providers: [
    JwtStrategy,
    AuthService,
    JwtService,
    // UsersService,
    RolePermissionService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: TransformInterceptor,
    // },
  ],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
