import { Controller, Get, Post } from '@nestjs/common';
import { Param } from '@nestjs/common/decorators/http/route-params.decorator';
import {
  IPaginationResponse,
  IResponse,
} from '../../common/interfaces/response.interface';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAll(): Promise<IPaginationResponse<User>> {
    return {
      isSuccess: true,
      message: 'Get users success',
      data: await this.usersService.find(),
      pagination: {
        page: 1,
        pageCount: 1,
        pageSize: 1,
        total: 1,
      },
    };
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<IResponse<User>> {
    return {
      isSuccess: true,
      message: 'Get user success',
      data: await this.usersService.findById(id),
    };
  }

  @Post()
  async create(): Promise<IResponse<User>> {
    return {
      isSuccess: true,
      message: 'Create user success',
      data: await this.usersService.create({}),
    };
  }
}
