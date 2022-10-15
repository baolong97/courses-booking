import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ECourseLevel } from '../constants';

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

  @IsNotEmpty({ message: 'Trainer is required' })
  trainer: string;

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
  contents: CourseContent[];

  @IsNumber()
  @IsNotEmpty({ message: 'Price is required' })
  price: number;
}
