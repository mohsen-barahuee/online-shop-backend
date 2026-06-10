import { SetMetadata } from '@nestjs/common';

export const IS_PUBLCK_KEY = 'is_public';

export const Public = () => SetMetadata(IS_PUBLCK_KEY, true);
