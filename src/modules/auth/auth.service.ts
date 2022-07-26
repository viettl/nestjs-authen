import { LoginDto } from './dto/login.dto';
import { TokenPayLoadDto } from './dto/token.dto';
import { TokenType } from './../../common/constants/token-type';
import { JwtPayload } from './../../common/interfaces/IJwtPayload';
import { UsersService } from './../users/users.service';
import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshTokenEntity } from '@/entities/refresh-token';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private configsService: ConfigService,

    @InjectRepository(RefreshTokenEntity)
    private refreshTokenRepository: Repository<RefreshTokenEntity>,
  ) {}

  async login(loginData: LoginDto) {
    //
    try {
      const isValid = await this.usersService.validateUserPassword(loginData);
      if (!isValid) {
        return {
          message: 'Invalid credentials',
          status: 400,
        };
      }

      const user = await this.usersService.findByEmail(loginData.email);

      if (!user) {
        throw new Error('Invalid credentials');
      }
      const tokenPayload = await this.generateTokenResponse(user.id);
      return tokenPayload;
    } catch (error) {
      throw error;
    }
  }

  protected async generateTokenResponse(userId: string) {
    const accessToken = await this.generateAccessToken(userId);
    const refreshToken = await this.generateRefreshToken(userId);

    this.logger.debug(
      `Generated access/refresh Token with payload ${JSON.stringify({
        userId,
      })}`,
    );
    return new TokenPayLoadDto({
      tokenType: 'Bearer',
      accessToken,
      refreshToken,
    });
  }

  protected async generateRefreshToken(userId: string) {
    const payload: JwtPayload = {
      userId,
      tokenType: TokenType.ACCESS_TOKEN,
    };
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configsService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configsService.get(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      )}`,
    });
    const tokenObject = {
      token: refreshToken,
      userId,
    };
    await this.refreshTokenRepository.save(tokenObject);
    return refreshToken;
  }

  protected generateAccessToken(userId: string) {
    const payload: JwtPayload = {
      userId,
      tokenType: TokenType.ACCESS_TOKEN,
    };

    const jwt = this.jwtService.sign(payload, {
      secret: this.configsService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configsService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}`,
    });
    return jwt;
  }
}
