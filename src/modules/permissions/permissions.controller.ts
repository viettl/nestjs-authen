import { PermissionsService } from './permissions.service';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResponseMessage } from '@/common/decorators/response.decorator';
import { USER_CREATED } from '../../common/constants/response.constants';

@ApiTags('permissions')
@Controller('permissions')
export class PermissionsController {
  constructor(private permissionsService: PermissionsService) {}

  @ApiOperation({ summary: 'Create a new permission' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Permission Created.',
  })
  @Post('/')
  @UsePipes(ValidationPipe)
  @ResponseMessage(USER_CREATED)
  async create(@Body() permission: any) {
    try {
      const permissionCreated = await this.permissionsService.create(
        permission,
      );
      return {
        statusCode: HttpStatus.OK,
        data: {
          ...permissionCreated,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: 'Find all permissions' })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Get('/')
  @UsePipes(ValidationPipe)
  @ResponseMessage(USER_CREATED)
  async findAll() {
    try {
      const permissions = await this.permissionsService.findAll();
      return {
        statusCode: HttpStatus.OK,
        data: permissions,
      };
    } catch (error) {
      throw error;
    }
  }
}
