import { LoginDto } from './dto/login.dto';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
  Res,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { TokenPayLoadDto } from './dto/token.dto';

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
  async login(@Res() res, @Body() userLoginDto: LoginDto) {
    try {
      const tokenPayload = await this.authService.login(userLoginDto);
      return res.status(HttpStatus.OK).json(tokenPayload);
    } catch (error) {
      throw error;
    }
    //
  }
}
