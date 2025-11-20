import {
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { BaseService } from '../services/base.service';
import { PaginationDto } from '../dto/pagination.dto';
import { PaginatedResponse } from '../interfaces/paginated-response.interface';
import { applyDecorators, SetMetadata } from '@nestjs/common';
import 'reflect-metadata';
import { CustomApiDocs } from 'src/decorators/customApiDocs.decorator';
import { PaginatedResponseDto } from '../dto/response.dto';

export class BaseController<T,CreateDto,UpdateDto> {
    constructor(private readonly baseService: BaseService<T>) {
    }
    @Get()
    @ApiBearerAuth()
    @CustomApiDocs({action: 'الحصول على جميع',summary: 'السجلات',type: 'none',responseDto: PaginatedResponseDto})
    async findAll(@Query() params: PaginationDto): Promise<PaginatedResponse<T>> {
        return this.baseService.findAll(params);
    }

    @Get(':id')
    @ApiBearerAuth()
    @CustomApiDocs({action: 'الحصول على',summary: 'السجل',type: 'none',})
    async findOne(@Param('id') id: string): Promise<T> {
        return this.baseService.findOne(id);
    }

    @Post()
    @ApiBearerAuth()
    async create(@Body() data: CreateDto): Promise<T> {
        return this.baseService.create(data);
    }

    @Put(':id')
    @ApiBearerAuth()
    async update(
        @Param('id') id: string,
        @Body() data: UpdateDto,
    ): Promise<T> {
        return this.baseService.update(id, data);
    }

    @Delete(':id')
    @ApiBearerAuth()
    async delete(@Param('id') id: string): Promise<T> {
        return this.baseService.delete(id);
    }
}