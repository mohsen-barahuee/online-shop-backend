import { IsNotEmpty, IsString, IsOptional, Length } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  province: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  @Length(10, 10, { message: 'کد پستی باید 10 رقم باشد' })
  postal_code: string;

  @IsString()
  @IsNotEmpty()
  @Length(11, 11, { message: 'مقدار درسی برای مبایل وارد نشده است' })
  reciver_mobile: string;

  @IsString()
  @IsOptional()
  description: string;
}
