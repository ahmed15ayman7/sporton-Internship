import { Injectable } from '@nestjs/common';
import { RegisterDTO, UserResponseDTO } from '../auth/dto/auth.dto';
import { DatabaseService } from '../database/database.service';
import { removeFields } from '../utils/object.util';
import { User, UserStatus } from '@shared/prisma';
import {
  PaginationQueryType,
  PaginationResponseType,
} from 'src/types/util.types';
import { updateUserDTO } from './dto/user.dto';
import { UpdateUserDto } from 'src/dtos/User.update.dto';
import { UserDto } from 'src/dtos/User.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: DatabaseService) {}

  create(registerDTO: RegisterDTO) {
    // Check if profile is completed at registration
    const isProfileCompleted = this.checkProfileCompletion(registerDTO as User);
    let isChoseRole = false;
    if (registerDTO.role) {
      isChoseRole = true;
    }

    return this.prismaService.user.create({
      data: {
        ...registerDTO,
        isProfileCompleted,
        isChoseRole,
      },
    });
  }

  findAll(
    query: PaginationQueryType,
  ): Promise<PaginationResponseType<Omit<User, 'password'>>> {
    return this.prismaService.$transaction(async (prisma) => {
      const pagination = this.prismaService.handleQueryPagination(query);
      const users = await prisma.user.findMany({
        ...removeFields(pagination, ['page']),
        omit: {
          password: true,
        },
      });

      const count = await prisma.user.count();
      return {
        data: users,
        ...this.prismaService.formatPaginationResponse({
          page: pagination.page,
          count,
          limit: pagination.take,
        }),
      };
    });
  }

  findByEmailOrThrow(email: string) {
    return this.prismaService.user.findUniqueOrThrow({
      where: { email },
    });
  }
  findOne(id: string) {
    return this.prismaService.user.findUnique({
      where: { id },
      omit: { password: true },
    });
  }

  async update(id: string, userUpdatePayload: Partial<UpdateUserDto>) {
    // Get current user data
    const currentUser = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!currentUser) {
      throw new Error('User not found');
    }

    // Check if profile is completed after update
    const updatedData = { ...currentUser, ...userUpdatePayload };
    const isProfileCompleted = this.checkProfileCompletion(updatedData);

    await this.prismaService.user.update({
      where: { id },
      data: {
        ...userUpdatePayload,
        isProfileCompleted,
      },
      omit: {
        password: true,
      },
    });
    const updatedUser = await this.prismaService.user.findUnique({
      where: { id },
      omit: { password: true },
    });
    return updatedUser;
  }

  delete(id: string) {
    return this.prismaService.user.update({
      where: { id },
      data: { status: UserStatus.BANNED },
    });
  }

  updateLastLogin(id: string) {
    return this.prismaService.user.update({
      where: { id },
      data: { lastLogin: new Date() },
    });
  }
  userWithlastLogin(id: string) {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }
  // Check if all optional profile fields are filled
  private checkProfileCompletion(user: User): boolean {
    // Check if all optional fields are filled (not null or undefined)
    const optionalFields = [
      user.phone,
      user.image,
      user.cover,
      user.country,
      user.city,
      user.language,
      user.sport,
    ];

    return optionalFields.every(
      (field) => field !== null && field !== undefined,
    );
  }

  mapUserWithoutPassword(user: User): UserResponseDTO['userData'] {
    const userWithoutPassword = removeFields(user, ['password']);

    return {
      ...userWithoutPassword,
      id: userWithoutPassword.id,
    } as UserResponseDTO['userData'];
  }
}
