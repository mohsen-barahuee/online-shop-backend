import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/role.decorator';
import UsersRoleEnum from 'enums/usersRoleEnums';
import { JwtPayload } from '../strategeies/jwt.stragety';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    console.log('=== ROLES GUARD IS RUNNING ===');
    // get roles in metadata
    const requiredRoles = this.reflector.getAllAndOverride<UsersRoleEnum[]>(
      ROLES_KEY,
      [context.getClass(), context.getHandler()],
    );

    if (!requiredRoles) {
      return true;
    }

    // ✅ No type assertion needed
    const request: object = context.switchToHttp().getRequest();
    const user = request.user as JwtPayload; // Use 'as' here if needed, or better yet:
    // const user: JwtPayload = request.user; // This is cleaner
    const hasRole = requiredRoles.includes(user.role);

    if (!hasRole) {
      return false;
    }

    return true;
  }
}
