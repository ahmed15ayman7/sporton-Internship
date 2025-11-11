import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ContactUs } from '@shared/prisma';
import {  ContactUpdateDTO } from './dto/contact.dto';
import { CreateContactUsDto } from '../../dtos/ContactUs.create.dto';

import {
  PaginationQueryType,
  PaginationResponseType,
} from 'src/types/util.types';
import { removeFields } from '../utils/object.util';

@Injectable()
export class ContactService {
  constructor(private prismaService: DatabaseService) {}

  async create(contactDto: CreateContactUsDto) {
    return this.prismaService.contactUs.create({ data: contactDto });
  }

  findAll(
    query: PaginationQueryType,
  ): Promise<PaginationResponseType<ContactUs>> {
    return this.prismaService.$transaction(async (prisma) => {
      const pagination = this.prismaService.handleQueryPagination(query);
      const contacts = await prisma.contactUs.findMany({
        ...removeFields(pagination, ['page']),
      });

      const count = await prisma.contactUs.count();
      return {
        data: contacts,
        ...this.prismaService.formatPaginationResponse({
          page: pagination.page,
          count,
          limit: pagination.take,
        }),
      };
    });
  }

  async findOne(id: string) {
    return this.prismaService.contactUs.findUnique({ where: { id } });
  }

  async update(id: string, contactUpdateDto: ContactUpdateDTO) {
    return this.prismaService.contactUs.update({
      where: { id },
      data: contactUpdateDto,
    });
  }

  async remove(id: string) {
    return this.prismaService.contactUs.delete({ where: { id } });
  }
}
