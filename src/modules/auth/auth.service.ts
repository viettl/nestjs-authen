import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto, TokenPayLoadDto } from './dto/token.dto';
import { TokenType } from './../../common/constants/token-type';
import { JwtPayload } from './../../common/interfaces/IJwtPayload';
import { UsersService } from './../users/users.service';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
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

  protected async generateTokenResponse(user_id: string) {
    const accessToken = await this.generateAccessToken(user_id);
    const refreshToken = await this.generateRefreshToken(user_id);

    this.logger.debug(
      `Generated access/refresh Token with payload ${JSON.stringify({
        user_id,
      })}`,
    );
    return new TokenPayLoadDto({
      tokenType: 'Bearer',
      accessToken,
      refreshToken,
    });
  }

  protected async generateRefreshToken(user_id: string) {
    const payload: JwtPayload = {
      user_id,
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
      user_id,
    };
    await this.refreshTokenRepository.save(tokenObject);
    return refreshToken;
  }

  protected generateAccessToken(user_id: string) {
    const payload: JwtPayload = {
      user_id,
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

  async getRefreshToken(
    refreshToken: RefreshTokenDto,
  ): Promise<TokenPayLoadDto> {
    const token = await this.refreshTokenRepository.findOne({
      where: { token: refreshToken.token },
    });
    if (!token) {
      throw new Error('Invalid refresh token');
    }
    try {
      await this.refreshTokenRepository.delete({ id: token.id });
      const tokenResponse = await this.generateTokenResponse(token.user_id);
      return tokenResponse;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
