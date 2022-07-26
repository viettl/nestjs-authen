import { AuthController } from './auth.controllder';
import { AuthService } from './auth.service';
import { UserEntity } from 'src/entities/users';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { RefreshTokenEntity } from '@/entities/refresh-token';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    ConfigModule,
    // UserModule,
    TypeOrmModule.forFeature([UserEntity, RefreshTokenEntity]),
  ],
  providers: [JwtStrategy, AuthService, JwtService, UsersService],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
