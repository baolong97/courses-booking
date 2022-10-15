import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, {
  FilterQuery,
  Model,
  ProjectionType,
  QueryOptions,
} from 'mongoose';
import { AuthUserDto } from '../accounts/auth/dto/auth-user.dto';
import { ERole } from '../accounts/users/constants';
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
    return (
      await this.courseModel.create({
        ...createCourseDto,
        numberOfLessons: createCourseDto?.lessons?.length ?? 0,
        numberOfExercises: createCourseDto?.exercises?.length ?? 0,
        numberOfDocuments: createCourseDto?.documents?.length ?? 0,
      })
    ).toObject();
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

  async findOne(filter?: FilterQuery<Course>): Promise<Course> {
    return await this.courseModel.findOne(filter).lean().exec();
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    return await this.courseModel
      .findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(id) },
        {
          ...updateCourseDto,
          numberOfLessons: updateCourseDto?.lessons?.length ?? 0,
          numberOfExercises: updateCourseDto?.exercises?.length ?? 0,
          numberOfDocuments: updateCourseDto?.documents?.length ?? 0,
        },
        { returnDocument: 'after' },
      )
      .lean()
      .exec();
  }

  async remove(id: string): Promise<Course> {
    return await this.courseModel.findByIdAndRemove(id).lean().exec();
  }

  async count(filter?: FilterQuery<Course>): Promise<number> {
    return await this.courseModel.count(filter);
  }

  async removeNotTrailLinks(
    course: Course,
    user: AuthUserDto,
  ): Promise<Course> {
    if (!course) return course;
    const isPurchasedCourse = false;
    const isAdmin = user?.roles.includes(ERole.ADMIN);
    for (const field of ['lessons', 'exercises', 'documents']) {
      for (let i = 0; i < course[field]?.length ?? 0; i++) {
        if (
          (!isPurchasedCourse || !user) &&
          !course[field][i].isTrial &&
          !isAdmin
        ) {
          course[field][i].url = '';
        }
      }
    }

    return course;
  }
}
