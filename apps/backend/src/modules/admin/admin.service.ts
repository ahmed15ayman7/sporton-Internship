import { Injectable } from '@nestjs/common';
import { RegisterDTO, UserResponseDTO } from '../auth/dto/auth.dto';
import { DatabaseService } from '../database/database.service';
import { removeFields } from '../utils/object.util';
import { Admin, AdminStatus, User, UserStatus } from '@shared/prisma';
import {
  PaginationQueryType,
  PaginationResponseType,
} from 'src/types/util.types';
import { CreateAdminDto } from 'src/dtos/Admin.create.dto';
import { UpdateAdminDto } from 'src/dtos/Admin.update.dto';

@Injectable()
export class AdminService {
  constructor(private prismaService: DatabaseService) {}

  create(registerDTO: CreateAdminDto) {
    return this.prismaService.admin.create({
      data: registerDTO,
    });
  }

  findAll(
    query: PaginationQueryType,
  ): Promise<PaginationResponseType<Omit<Admin, 'password'>>> {
    return this.prismaService.$transaction(async (prisma) => {
      const pagination = this.prismaService.handleQueryPagination(query);
      const admins = await prisma.admin.findMany({
        ...removeFields(pagination, ['page']),
        omit: {
          password: true,
        },
      });

      const count = await prisma.admin.count();
      return {
        data: admins,
        ...this.prismaService.formatPaginationResponse({
          page: pagination.page,
          count,
          limit: pagination.take,
        }),
      };
    });
  }

  findByEmailOrThrow(email: string) {
    return this.prismaService.admin.findUniqueOrThrow({
      where: { email },
    });
  }
  findOne(id: string) {
    return this.prismaService.admin.findUnique({
      where: { id },
      omit: { password: true },
    });
  }

  update(id: string, adminUpdatePayload: UpdateAdminDto) {
    {
      return this.prismaService.admin.update({
        where: { id },
        data: adminUpdatePayload,
        omit: {
          password: true,
        },
      });
    }
  }

  delete(id: string) {
    return this.prismaService.admin.update({
      where: { id },
      data: { status: AdminStatus.TERMINATED },
    });
  }

  mapUserWithoutPassword(user: Admin) {
    const userWithoutPassword = removeFields(user, ['password']);

    return {
      ...userWithoutPassword,
      id: userWithoutPassword.id,
    };
  }
}
