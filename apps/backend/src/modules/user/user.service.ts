import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { removeFields } from '../utils/object.util';
import { User, UserStatus } from '@shared/prisma';
import {
  PaginationQueryType,
  PaginationResponseType,
} from 'src/types/util.types';
import { updateUserDTO } from './dto/user.dto';
import { BaseService } from 'src/common/services/base.service';
import { UserResponseDTO } from 'src/auth/dto/auth.dto';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(prisma: PrismaService) {
    super(prisma, 'user');
  }

  findByEmailOrThrow(email: string) {
    return this.prisma.user.findUniqueOrThrow({
      where: { email },
    });
  }

  mapUserWithoutPasswordAndCastBigint(user: User): UserResponseDTO['userData'] {
    const userWithoutPassword = removeFields(user, ['password']);

    return {
      ...userWithoutPassword,
      id: userWithoutPassword.id,
    };
  }
}
