import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/role.decorator';
import UsersRoleEnum from 'enums/usersRoleEnums';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UsersRoleEnum[]>(
      ROLES_KEY,
      [context.getClass(), context.getHandler()],
    );

    if (!requiredRoles) return true;

    // get user data from jwt token
    const { user } = context.switchToHttp().getRequest();

    // check access role
    const hasRole = requiredRoles.includes(user.role);

    if (!hasRole)
      throw new ForbiddenException('شما اجازه دسترسی به این مسیر رو ندارید!');

    return true;
  }
}
