import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  IPaginationResponse,
  IResponse,
} from '../common/interfaces/response.interface';

import mongoose from 'mongoose';
import { Roles } from '../accounts/auth/decorators/roles.decorator';
import { User } from '../accounts/auth/decorators/user.decorator';
import { AuthUserDto } from '../accounts/auth/dto/auth-user.dto';
import { JwtAccessTokenAuthGuard } from '../accounts/auth/guards/jwt-access-token-auth.guard';
import { OptionalJwtAccessTokenAuthGuard } from '../accounts/auth/guards/optional-jwt-access-token-auth.guard';
import { RolesGuard } from '../accounts/auth/guards/roles.guard';
import { ERole } from '../accounts/users/constants';
import { ParseIntPipe } from '../common/pipes/parseInt.pipe';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './schemas/course.schema';
import { ECourseLevel } from './constants';
import * as _ from 'lodash';

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
    @Query('fromDuration', ParseIntPipe) fromDuration?: number,
    @Query('toDuration', ParseIntPipe) toDuration?: number,
    @Query('level') level?: ECourseLevel,
    @Query('sortField') sortField = 'createdAt',
    @Query('sortType') sortType = 'asc',
    @Query('page', ParseIntPipe) page = 0,
    @Query('pageSize', ParseIntPipe) pageSize = 10,
  ): Promise<IPaginationResponse<Course>> {
    let filter = { $and: [] } as any;

    if (title) {
      filter['$and'].push({ $text: { $search: title } });
    }
    if (level?.toLowerCase() !== 'all') {
      filter['$and'].push({ level });
    }
    if (!_.isNil(fromDuration) && !_.isNil(toDuration)) {
      filter['$and'].push({
        durationInSeconds: { $gte: fromDuration, $lt: toDuration },
      });
    } else if (!_.isNil(fromDuration)) {
      filter['$and'].push({
        durationInSeconds: { $gte: fromDuration },
      });
    }

    if (!title && !level && _.isNil(fromDuration) && _.isNil(toDuration)) {
      filter = {};
    }

    return {
      isSuccess: true,
      message: 'Create course success',
      data: await this.coursesService.findAll(
        filter,
        '_id title trainer thumbnail price numberOfStudents numberOfLessons numberOfExercises numberOfDocuments durationInSeconds createdAt updatedAt',
        {
          skip: page * pageSize,
          limit: pageSize,
          sort: {
            [sortField]: sortType,
          },
        },
      ),

      pagination: {
        page,
        pageSize,
        pageCount: 1,
        totalPage: Math.floor(
          (await this.coursesService.count(filter)) / pageSize + 1,
        ),
      },
    };
  }

  @UseGuards(new OptionalJwtAccessTokenAuthGuard())
  @Get(':id')
  async getDetail(
    @User() user: AuthUserDto,
    @Param('id') id: string,
  ): Promise<IResponse<Course>> {
    const course = await this.coursesService.findOne({
      _id: new mongoose.Types.ObjectId(id),
    });
    if (!course) {
      throw new NotFoundException({
        isSuccess: false,
        message: 'Course not found',
        data: null,
      });
    }
    return {
      isSuccess: true,
      message: 'Get course detail success',
      data: await this.coursesService.removeNotTrailLinks(course, user),
    };
  }

  @UseGuards(RolesGuard)
  @UseGuards(new JwtAccessTokenAuthGuard())
  @Roles(ERole.ADMIN)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<IResponse<Course>> {
    const course = await this.coursesService.update(id, updateCourseDto);
    if (!course) {
      throw new NotFoundException({
        isSuccess: false,
        message: 'Course not found',
        data: null,
      });
    }
    return {
      isSuccess: true,
      message: 'Update course success',
      data: course,
    };
  }

  @UseGuards(RolesGuard)
  @UseGuards(new JwtAccessTokenAuthGuard())
  @Roles(ERole.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IResponse<Course>> {
    const course = await this.coursesService.remove(id);
    if (!course) {
      throw new NotFoundException({
        isSuccess: false,
        message: 'Course not found',
        data: null,
      });
    }
    return {
      isSuccess: true,
      message: 'Delete course success',
      data: await this.coursesService.remove(id),
    };
  }
}
