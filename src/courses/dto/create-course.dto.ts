import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ECourseLevel } from '../constants';

export class CourseTrainer {
  @IsString()
  @IsNotEmpty({ message: 'Vui lòng nhập hình đại diện của giáo viên' })
  avatarUrl: string;
  @IsString()
  @IsNotEmpty({ message: 'Vui lòng nhập tên của giáo viên' })
  name: string;
  @IsString()
  @IsNotEmpty({ message: 'Vui lòng nhập chức danh của giáo viên' })
  title: string;
}

export class CourseContent {
  @IsString()
  @IsNotEmpty({ message: 'Vui lòng nhập tên bài học' })
  title: string;
  @IsString()
  @IsNotEmpty({ message: 'Vui lòng nhập đường dẫn bài học' })
  url: string;
  @IsBoolean()
  @IsNotEmpty({
    message: 'Vui lòng đánh dấu bài học có được dùng thử hay không',
  })
  isTrial: boolean;
}

export class CreateCourseDto {
  @IsNotEmpty({ message: 'Vui lòng nhập tiêu đề khóa học' })
  title: string;

  @IsNotEmpty({ message: 'Vui lòng nhập ảnh đại diện của khóa học' })
  thumbnail: string;

  @Type(() => CourseTrainer)
  @ValidateNested()
  @IsNotEmpty({ message: 'Vui lòng nhập thông tin giáo viên' })
  trainer: CourseTrainer;

  @IsNotEmpty({ message: 'Vui lòng nhập cấp độ khóa học' })
  @IsEnum(ECourseLevel)
  level: ECourseLevel;

  @IsString({ each: true })
  @IsOptional()
  highlights: string[];

  @IsString()
  @IsNotEmpty({ message: 'Vui lòng nhập thông tin tông quát về khóa học' })
  overview: string;

  @IsString()
  @IsNotEmpty({ message: 'Vui lòng nhập giới thiệu khóa học' })
  introduce: string;

  @Type(() => CourseContent)
  @ValidateNested({ each: true })
  lessons: CourseContent[];

  @Type(() => CourseContent)
  @ValidateNested({ each: true })
  exercises: CourseContent[];

  @Type(() => CourseContent)
  @ValidateNested({ each: true })
  documents: CourseContent[];

  @IsNumber()
  @IsNotEmpty({ message: 'Vui lòng nhập giá khóa học' })
  price: number;

  @IsString({ each: true })
  @IsOptional()
  tags: string[];

  @IsInt({ message: 'Vui lòng nhập thời lượng khóa học' })
  durationInSeconds: number;

  @IsBoolean()
  @IsOptional()
  isEndSell: boolean;
}
