import { IsString, IsNotEmpty, Length, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @Length(11, 11, { message: 'شماره مبایل باید 11 رقم باشه' })
  @Transform(({ value }): string =>
    typeof value === 'string' ? value.trim() : value,
  )
  mobile: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsString()
  display_name: string;
}
