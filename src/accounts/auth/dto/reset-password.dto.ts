import { IsNotEmpty } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty({ message: 'Code is required' })
  code: string;
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
  @IsNotEmpty({ message: 'Confirm password is required' })
  confirmPassword: string;
}
