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

export class CourseContent {
  @IsString({ message: 'Vui lòng nhập chuỗi ký tự' })
  @IsNotEmpty({ message: 'Vui lòng nhập tên bài học' })
  title: string;
  @IsString({ message: 'Vui lòng nhập chuỗi ký tự' })
  @IsNotEmpty({ message: 'Vui lòng nhập đường dẫn bài học' })
  url: string;
  @IsString({ message: 'Vui lòng nhập chuỗi ký tự' })
  @IsNotEmpty({ message: 'Vui lòng nhập tài liệu của bài học' })
  document: string;
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

  @IsNotEmpty({ message: 'Vui lòng nhập cấp độ khóa học' })
  @IsEnum(ECourseLevel)
  level: ECourseLevel;

  @IsString({ each: true })
  @IsOptional()
  highlights: string[];

  @IsString({ message: 'Vui lòng nhập chuỗi ký tự' })
  @IsNotEmpty({ message: 'Vui lòng nhập thông tin tông quát về khóa học' })
  overview: string;

  @IsString({ message: 'Vui lòng nhập chuỗi ký tự' })
  @IsNotEmpty({ message: 'Vui lòng nhập giới thiệu khóa học' })
  introduce: string;

  @Type(() => CourseContent)
  @ValidateNested({ each: true })
  lessons: CourseContent[];

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
