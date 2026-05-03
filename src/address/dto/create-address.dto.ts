import { IsNotEmpty, IsString, IsOptional, Length } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty({ message: 'userId Is empty' })
  userId: number;

  @IsString({ message: 'province should be string' })
  @IsNotEmpty({ message: 'province is empty' })
  province: string;

  @IsString({ message: 'city is not string' })
  @IsNotEmpty({ message: 'city is empty' })
  city: string;

  @IsString({ message: 'address is not string' })
  @IsNotEmpty({ message: 'address is empty' })
  address: string;

  @IsString({ message: 'postal code is not string' })
  @IsNotEmpty({ message: 'postal code is empty' })
  @Length(10, 10, { message: 'کد پستی باید 10 رقم باشد' })
  postal_code: string;

  @IsString({ message: 'reciver mobile is not string' })
  @IsNotEmpty({ message: 'reciver mobile is empty' })
  @Length(12, 12, { message: 'مقدار درسی برای مبایل وارد نشده است' })
  reciver_mobile: string;

  @IsString({ message: 'desciption is not string' })
  @IsOptional()
  description: string;
}
