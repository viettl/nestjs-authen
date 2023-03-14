import { LoginDto } from './dto/login.dto';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { TokenPayLoadDto, RefreshTokenDto } from './dto/token.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: TokenPayLoadDto,
    description: 'User info with access/refresh token',
  })
  @UsePipes(ValidationPipe)
  // @ResponseMessage(USER_UPDATED)
  async login(@Body() userLoginDto: LoginDto) {
    try {
      const tokenPayload = await this.authService.login(userLoginDto);
      return {
        statusCode: HttpStatus.OK,
        data: { ...tokenPayload },
      };
    } catch (error) {
      throw error;
    }
    //
  }

  @Post('/refresh-token')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: TokenPayLoadDto,
    description: 'User info with access/refresh token',
  })
  @UsePipes(ValidationPipe)
  async refreshToken(@Body() tokenPayloadDto: RefreshTokenDto) {
    try {
      const tokenPayload = await this.authService.getRefreshToken(
        tokenPayloadDto,
      );
      return {
        statusCode: HttpStatus.OK,
        data: { ...tokenPayload },
      };
    } catch (error) {
      throw error;
    }
  }

  // // test role admin only
  // @Post('/test-role')
  // @HttpCode(HttpStatus.OK)
  // @ApiResponse({
  //   description: "User can't access this route",
  // })
  // @Auth
}
