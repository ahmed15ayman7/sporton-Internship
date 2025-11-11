import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ContactService } from './contact.service';

import { PaginationQueryType } from 'src/types/util.types';
import { IsPublic } from 'src/decorators/public.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CreateContactUsDto } from '../../dtos/ContactUs.create.dto';
import { UpdateContactUsDto } from '../../dtos/ContactUs.update.dto';

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @IsPublic(true)
  @ApiOperation({ summary: 'Create a new contact message' })
  @ApiBody({
    description: 'Contact message data',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'John Doe' },
        email: { type: 'string', example: 'john@example.com' },
        subject: { type: 'string', example: 'Service Inquiry' },
        message: { type: 'string', example: 'I would like to inquire about...' },
      },
      required: ['name', 'email', 'message'],
    },
  })
  @ApiResponse({ status: 201, description: 'Message sent successfully' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  create(
    @Body()
    contactDto: CreateContactUsDto,
  ) {
    return this.contactService.create(contactDto);
  }

  @Get()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all contact messages' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiResponse({ status: 200, description: 'Messages retrieved successfully' })
  findAll(@Query() query: PaginationQueryType) {
    return this.contactService.findAll(query);
  }

  @Get(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get a specific contact message' })
  @ApiParam({ name: 'id', description: 'Message ID' })
  @ApiResponse({ status: 200, description: 'Message retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Message not found' })
  findOne(@Param('id') id: string) {
    return this.contactService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update contact message status' })
  @ApiParam({ name: 'id', description: 'Message ID' })
  @ApiBody({
    description: 'New message status',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'READ' },
      },
      required: ['status'],
    },
  })
  @ApiResponse({ status: 200, description: 'Message updated successfully' })
  @ApiResponse({ status: 404, description: 'Message not found' })
  update(@Param('id') id: string, @Body() contactUpdateDto: UpdateContactUsDto) {
    return this.contactService.update(id, contactUpdateDto);
  }
}
