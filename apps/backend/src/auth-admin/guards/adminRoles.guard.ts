import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ADMIN_ROLES_KEY } from '../../decorators/adminRoles.decorator';

@Injectable()
export class AdminRolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ADMIN_ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // لو مفيش Roles على الـ endpoint نسمح عادي
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const { admin } = context.switchToHttp().getRequest();

    if (!admin || !admin.role) {
      throw new ForbiddenException('User has no role or is not authenticated');
    }

    if (!requiredRoles.includes(admin.role)) {
      throw new ForbiddenException('You do not have permission (role mismatch)');
    }

    return true;
  }
}
