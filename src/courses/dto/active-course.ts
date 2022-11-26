import { IsNotEmpty, IsString } from 'class-validator';

export class ActiveCourseDto {
  @IsString()
  @IsNotEmpty({ message: 'Vui lòng nhập mã kích hoạt khóa học' })
  code: string;
}
