import { IsNotEmpty, IsString } from 'class-validator';

export class ActiveCourseDto {
  @IsString()
  @IsNotEmpty({ message: 'Code is required' })
  code: string;
}
