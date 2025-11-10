import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Contact } from '@shared/prisma';
import { ContactDTO, ContactUpdateDTO } from './dto/contact.dto';
import {
  PaginationQueryType,
  PaginationResponseType,
} from 'src/types/util.types';
import { removeFields } from '../utils/object.util';

@Injectable()
export class ContactService {
  constructor(private prismaService: DatabaseService) {}

  async create(contactDto: ContactDTO) {
    return this.prismaService.contact.create({ data: contactDto });
  }

  findAll(
    query: PaginationQueryType,
  ): Promise<PaginationResponseType<Contact>> {
    return this.prismaService.$transaction(async (prisma) => {
      const pagination = this.prismaService.handleQueryPagination(query);
      const contacts = await prisma.contact.findMany({
        ...removeFields(pagination, ['page']),
      });

      const count = await prisma.contact.count();
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
    return this.prismaService.contact.findUnique({ where: { id } });
  }

  async update(id: string, contactUpdateDto: ContactUpdateDTO) {
    return this.prismaService.contact.update({
      where: { id },
      data: contactUpdateDto,
    });
  }

  async remove(id: string) {
    return this.prismaService.contact.delete({ where: { id } });
  }
}
