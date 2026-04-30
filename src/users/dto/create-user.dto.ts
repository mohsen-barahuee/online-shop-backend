import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
import UsersRoleEnum from 'enums/usersRoleEnums';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(11, 11, { message: 'شماره مبایل باید 11 رقم باشه' })
  @Transform(({ value }): string =>
    typeof value === 'string' ? value.trim() : value,
  )
  mobile: string;

  @IsString()
  @IsOptional()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsString()
  display_name: string;

  @IsEnum(UsersRoleEnum)
  role: UsersRoleEnum;
}
