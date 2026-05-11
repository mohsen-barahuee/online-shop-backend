import { IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateBookmarkDto {
  @IsNotEmpty({ message: 'شناسه محصول نباید خالی باشد' })
  @IsNumberString({}, { message: 'شناسه محصول باید یک عدد معتبر باشد' })
  product_id: string;

  // در یک پروژه واقعی، معمولاً user_id از طریق JWT (Request User)
  // دریافت می‌شود و نیازی نیست کاربر در بدنه درخواست (Body) بفرستد.
  // اما اگر اصرار دارید از اینجا دریافت شود:
  @IsNotEmpty({ message: 'شناسه کاربر نباید خالی باشد' })
  @IsNumberString({}, { message: 'شناسه کاربر باید یک عدد معتبر باشد' })
  user_id: string;
}
