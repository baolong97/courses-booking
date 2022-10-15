import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, ProjectionType, QueryOptions } from 'mongoose';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course, CourseDocument } from './schemas/course.schema';

@Injectable()
export class CoursesService {
  private readonly logger = new Logger(CoursesService.name);
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}
  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    return (await this.courseModel.create(createCourseDto)).toObject();
  }

  async findAll(
    filter?: FilterQuery<Course>,
    projection?: ProjectionType<Course> | null | undefined,
    options?: QueryOptions<Course> | null | undefined,
  ): Promise<Course[]> {
    return await this.courseModel
      .find(filter, projection, options)
      .lean()
      .exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course 1`;
  }
}
