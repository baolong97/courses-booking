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
  @IsNotEmpty({ message: 'Avatar url is required' })
  avatarUrl: string;
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  name: string;
  @IsString()
  @IsNotEmpty({ message: 'Url is required' })
  title: string;
}

export class CourseContent {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;
  @IsString()
  @IsNotEmpty({ message: 'Url is required' })
  url: string;
  @IsBoolean()
  @IsNotEmpty({ message: 'IsTrial is required' })
  isTrial: boolean;
}

export class CreateCourseDto {
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsNotEmpty({ message: 'Thumbnail is required' })
  thumbnail: string;

  @Type(() => CourseTrainer)
  @ValidateNested()
  @IsNotEmpty({ message: 'Trainer is required' })
  trainer: CourseTrainer;

  @IsNotEmpty({ message: 'Level is required' })
  @IsEnum(ECourseLevel)
  level: ECourseLevel;

  @IsString({ each: true })
  @IsOptional()
  benefits: string[];

  @IsString()
  @IsNotEmpty({ message: 'Overview is required' })
  overview: string;

  @IsString()
  @IsNotEmpty({ message: 'Introduce is required' })
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
  @IsNotEmpty({ message: 'Price is required' })
  price: number;

  @IsString({ each: true })
  @IsOptional()
  tags: string[];

  @IsInt({ message: 'Duration is required' })
  durationInSeconds: number;

  @IsBoolean()
  @IsOptional()
  isEndSell: boolean;
}
