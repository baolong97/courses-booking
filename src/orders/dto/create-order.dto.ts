import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { EPaymentType } from '../constants';

export class OrderCustomerInfo {
  @IsString()
  @IsNotEmpty({ message: 'Phone number is required' })
  phoneNumber: string;
  @IsString()
  @IsNotEmpty({ message: 'Full name is required' })
  fullName: string;
}

export class OrderItem {
  @IsString()
  @IsNotEmpty({ message: 'Course number is required' })
  course: string;
}

export class CreateOrderDto {
  userId: string;

  @Type(() => OrderCustomerInfo)
  @ValidateNested()
  @IsNotEmpty({ message: 'Customer info is required' })
  customerInfo: OrderCustomerInfo;

  @Type(() => OrderItem)
  @ValidateNested({ each: true })
  @IsNotEmpty({ message: 'Items info is required' })
  items: OrderItem[];

  @IsNotEmpty({ message: 'Payment type is required' })
  @IsEnum(EPaymentType)
  paymentType: EPaymentType;
}
