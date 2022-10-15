import { IsNotEmpty } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty({ message: 'Current password is required' })
  currentPassword: string;
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
  @IsNotEmpty({ message: 'Confirm password is required' })
  confirmPassword: string;
}
