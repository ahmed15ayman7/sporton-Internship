import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { request, Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Token_Payload } from '../types/user-auth.type';
import { DatabaseService } from 'src/modules/database/database.service';
import { removeFields } from 'src/modules/utils/object.util';
import { Reflector } from '@nestjs/core';
import { IsPublic } from 'src/decorators/public.decorator';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private prismaService: DatabaseService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext) {
    // route public
    const isPublic = this.reflector.getAllAndOverride<boolean>(IsPublic, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    // get request
    const req = context.switchToHttp().getRequest<Request>();

    // Skip this guard for admin routes (they use AdminAuthGuard)
    if (
      req.path?.startsWith('/api/user') ||
      req.path?.startsWith('/api/auth')
    ) {
      return true;
    }
    // authoraizatin header
    const authHeader = req.headers.authorization;
    // auth header = "Bearer <token>"
    const jwt = authHeader?.split(' ')[1];
    if (!jwt) {
      throw new UnauthorizedException();
    }

    try {
      // validate jwt
      const payload = this.jwtService.verify<Token_Payload>(jwt);

      // get user from db
      const admin = await this.prismaService.admin.findUniqueOrThrow({
        where: { id: payload.sub },
      });

      // attach user to request
      req.admin = {
        ...removeFields(admin, ['password']),
        id: String(admin.id),
      };
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
