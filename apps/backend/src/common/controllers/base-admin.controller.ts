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
// export function SetCustomSummary(summary: string, apiBodyCreate: any, apiBodyUpdate: any): ClassDecorator {
//     return (target: any) => {
//         Reflect.defineMetadata('custom:summary', summary, target);
//         Reflect.defineMetadata('apiBodyCreate', apiBodyCreate, target);
//         Reflect.defineMetadata('apiBodyUpdate', apiBodyUpdate, target);
//     };
// }

export function CustomApiDocs(action: string, type: 'create' | 'update' | 'none' = 'none', updateDto?: any, createDto?: any, summary?: string): MethodDecorator {
    let dtos = [type === 'none' ? null : type === 'create' && createDto ? ApiBody({ type: createDto }) : type === 'update' && updateDto ? ApiBody({ type: updateDto }) : null].filter(e => e !== null)
    const decorators = [
        ApiOperation({ summary: `${action} ${summary}` }),
        ApiResponse({ status: 200, description: `تم ${action} ${summary}` }),
        ApiResponse({ status: 400, description: `فشل ${action} ${summary}` }),
        ...dtos
    ];


    return applyDecorators(...decorators);

}


export class BaseAdminController<T> {
    constructor(private readonly baseService: BaseService<T>) {
    }
    @Get()
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع', 'none', null, null, "السجلات")
    async findAll(@Query() params: PaginationDto): Promise<PaginatedResponse<T>> {
        return this.baseService.findAll(params);
    }

    @Get(':id')
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على', 'none', null, null, "السجل")
    async findOne(@Param('id') id: string): Promise<T> {
        return this.baseService.findOne(id);
    }

    @Post()
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء', 'create', null, null, "السجل")
    async create(@Body() data: any): Promise<T> {
        return this.baseService.create(data);
    }

    @Put(':id')
    @ApiBearerAuth()
    @CustomApiDocs('تحديث', 'update', null, null, "السجل")
    async update(
        @Param('id') id: string,
        @Body() data: T,
    ): Promise<T> {
        return this.baseService.update(id, data);
    }

    @Delete(':id')
    @ApiBearerAuth()
    @CustomApiDocs('حذف', 'none', null, null, "السجل")
    async delete(@Param('id') id: string): Promise<T> {
        return this.baseService.delete(id);
    }
} 