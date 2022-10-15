import { IsNotEmpty } from 'class-validator';

export class UpdateProfileDto {
  // @IsPhoneNumber()
  @IsNotEmpty({ message: 'Phone number is required' })
  phoneNumber: string;
  @IsNotEmpty({ message: 'Full name is required' })
  fullName: string;
  birthDay?: string;
  avatarUrl?: string;
  address?: string;
}
