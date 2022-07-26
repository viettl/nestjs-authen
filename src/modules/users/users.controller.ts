import { CreateUserDto, UserDto } from './dto/users.dto';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Post,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
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

@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Register User' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'User Created.' })
  @Post('/register')
  @UsePipes(ValidationPipe)
  async register(@Res() res, @Body() userRegister: CreateUserDto) {
    try {
      const isEmailDuplicated = await this.usersService.findByEmail(
        userRegister.email,
      );

      if (!isEmailDuplicated) {
        const userCreated = await this.usersService.create(userRegister);

        // return userCreated;
        return res.status(HttpStatus.OK).json({
          message: 'User Created Successfully!',
          status: 201,
        });
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
    console.log(user);

    return new UserDto(user);
    //
  }
}
