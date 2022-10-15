import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  IPaginationResponse,
  IResponse,
} from '../common/interfaces/response.interface';

import { Roles } from '../accounts/auth/decorators/roles.decorator';
import { JwtAccessTokenAuthGuard } from '../accounts/auth/guards/jwt-access-token-auth.guard';
import { RolesGuard } from '../accounts/auth/guards/roles.guard';
import { ERole } from '../accounts/users/constants';
import { ParseIntPipe } from '../common/pipes/parseInt.pipe';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './schemas/course.schema';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @UseGuards(RolesGuard)
  @UseGuards(new JwtAccessTokenAuthGuard())
  @Roles(ERole.ADMIN)
  @Post()
  async create(
    @Body() createCourseDto: CreateCourseDto,
  ): Promise<IResponse<Course>> {
    return {
      isSuccess: true,
      message: 'Create course success',
      data: await this.coursesService.create(createCourseDto),
    };
  }

  @Get()
  async findAll(
    @Query('title') title?: string,
    @Query('sortField') sortField = 'createdAt',
    @Query('sortType') sortType = 'asc',
    @Query('page', ParseIntPipe) page = 0,
    @Query('pageSize', ParseIntPipe) pageSize = 10,
  ): Promise<IPaginationResponse<Course>> {
    return {
      isSuccess: true,
      message: 'Create course success',
      data: await this.coursesService.findAll(
        title ? { $text: { $search: title } } : {},
        '_id title thumbnail price createdAt updatedAt',
        {
          skip: page,
          limit: pageSize,
          sort: {
            [sortField]: sortType,
          },
          populate: [{ path: 'trainer', select: 'avatarUrl fullName' }],
        },
      ),
      pagination: {
        page,
        pageSize,
        pageCount: 1,
        total: 10,
      },
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
