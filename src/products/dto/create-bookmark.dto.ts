import { IsNotEmpty } from 'class-validator';

export class CreateBookmarkDto {
  @IsNotEmpty({ message: 'شناسه محصول نباید خالی باشد' })
  product_id: number;

  @IsNotEmpty({ message: 'شناسه کاربر نباید خالی باشد' })
  user_id: number;
}
