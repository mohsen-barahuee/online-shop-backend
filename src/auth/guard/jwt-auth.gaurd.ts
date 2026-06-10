import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLCK_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGaurd extends AuthGuard('jwt') {
  constructor(private reflectore: Reflector) {
    super();
  }

  // for checking user can pass the gaurd or not
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const isPublic = this.reflectore.getAllAndOverride<boolean>(IS_PUBLCK_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context) as Promise<boolean>;
  }

  handleRequest(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ) {
    if (err || !user) {
      throw err || new UnauthorizedException({ message: 'token invalid' });
    }

    return user;
  }
}
