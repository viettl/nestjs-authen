import {
  P_UPDATE_PROFILE,
  P_CHANGE_PASSWORD,
} from './../../common/constants/permissions.constants';
import { CreateUserDto, UserDto } from './dto/users.dto';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtGuard } from '@/common/guards/jwt.guard';
import { GetProfile } from '../../common/decorators/get-profile.decorator';
import { UserEntity } from '@/entities/users';
import { ResponseMessage } from '@/common/decorators/response.decorator';
import { USER_CREATED } from '../../common/constants/response.constants';
import { Auth } from '@/common/decorators/role.decorator';
import { UserRoles } from '@/common/interfaces/IUser';
import { Permissions, Roles } from '../../common/decorators/index';

@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Register User' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'User Created.' })
  @Post('/register')
  @UsePipes(ValidationPipe)
  @ResponseMessage(USER_CREATED)
  async register(@Body() userRegister: CreateUserDto) {
    try {
      const isEmailDuplicated = await this.usersService.findByEmail(
        userRegister.email,
      );

      if (!isEmailDuplicated) {
        const userCreated = await this.usersService.create(userRegister);
        return {
          statusCode: HttpStatus.OK,
          // ...tokenPayload,
        };
      } else {
        throw new NotFoundException('Email existed!');
      }
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth()
  @Get('/profile')
  @ApiOperation({ summary: 'Fetch information' })
  @UseGuards(JwtGuard)
  getProfile(@GetProfile() user: UserEntity): UserDto {
    // console.log({ req });
    return new UserDto(user);
    //
  }

  @Post('/update-password')
  @ApiOperation({ summary: "Update user''s password" })
  @Roles(UserRoles.ADMIN, UserRoles.USER)
  @Permissions(P_UPDATE_PROFILE, P_CHANGE_PASSWORD)
  @Auth()
  updatePassword(@Req() req: Request) {
    return {
      data: req.user,
    };
  }

  @Get('/')
  @ApiOperation({ summary: 'Get all users' })
  async findAll() {
    const users = await this.usersService.findAll();
    return {
      data: users,
    };
  }
}
