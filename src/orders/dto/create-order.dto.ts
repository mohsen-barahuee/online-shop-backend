import {
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsNumberString,
} from 'class-validator';
import { OrderStatus } from '../enums/orderStatus.enum';

export class CreateOrderDto {
  @IsNotEmpty({ message: 'شناسه کاربر نباید خالی باشد' })
  @IsNumberString({}, { message: 'شناسه کاربر باید یک عدد معتبر باشد' })
  user_id: string;

  @IsOptional()
  @IsEnum(OrderStatus, {
    message:
      'وضعیت سفارش نامعتبر است. مقادیر مجاز: PENDING, WAITING_FOR_PAYMENT, PAID, CANCELED',
  })
  status?: OrderStatus;

  @IsOptional()
  set_time?: Date;

  @IsOptional()
  payed_time?: Date;

  @IsOptional()
  @IsNumberString({}, { message: 'شناسه آدرس باید عدد باشد' })
  address_id?: string;

  @IsNotEmpty({ message: 'مبلغ کل نباید خالی باشد' })
  @IsNumberString({}, { message: 'مبلغ کل باید یک عدد معتبر باشد' })
  total_price: string;

  @IsOptional()
  @IsNumberString({}, { message: 'شناسه کد تخفیف باید عدد باشد' })
  discount_code?: string;
}
