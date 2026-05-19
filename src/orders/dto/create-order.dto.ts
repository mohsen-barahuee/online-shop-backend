import {
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsNumberString,
  IsArray,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';
import { OrderStatus } from 'enums/orderStatus.enum';
import { CreateOrderItemDto } from './create-order-items.dto';

export class CreateOrderDto {
  @IsNotEmpty({ message: 'شناسه کاربر نباید خالی باشد' })
  userId: number;

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
  addressId?: number;

  @IsOptional()
  @IsNumberString({}, { message: 'شناسه کد تخفیف باید عدد باشد' })
  discount_code?: string;
  @IsArray({ message: 'آیتم‌های سفارش باید به صورت آرایه ارسال شوند' })
  @ValidateNested({ each: true, message: 'هر آیتم سفارش باید معتبر باشد' })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}
