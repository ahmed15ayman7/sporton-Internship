import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ContactUs } from '@shared/prisma';
import { CreateContactUsDto } from '../../dtos/ContactUs.create.dto';

import {
  PaginationQueryType,
  PaginationResponseType,
} from 'src/types/util.types';
import { removeFields } from '../utils/object.util';
import { UpdateContactUsDto } from '../../dtos/ContactUs.update.dto';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async create(contactDto: CreateContactUsDto) {
    return this.prisma.contactUs.create({ data: contactDto });
  }

  findAll(
    query: PaginationQueryType,
  ): Promise<PaginationResponseType<ContactUs>> {
    return this.prisma.$transaction(async (prisma) => {
      const pagination = this.prisma.handleQueryPagination(query);
      const contacts = await prisma.contactUs.findMany({
        ...removeFields(pagination, ['page']),
      });

      const count = await prisma.contactUs.count();
      return {
        data: contacts,
        ...this.prisma.formatPaginationResponse({
          page: pagination.page,
          count,
          limit: pagination.take,
        }),
      };
    });
  }

  async findOne(id: string) {
    return this.prisma.contactUs.findUnique({ where: { id } });
  }

  async update(id: string, contactUpdateDto: UpdateContactUsDto) {
    return this.prisma.contactUs.update({
      where: { id },
      data: contactUpdateDto,
    });
  }

  async remove(id: string) {
    return this.prisma.contactUs.delete({ where: { id } });
  }
}
