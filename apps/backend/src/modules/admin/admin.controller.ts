import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { PaginationQueryType } from 'src/types/util.types';
import { updateAdminDTO } from './dto/user.dto';
import { ZodValidationPipe } from 'src/pipes/zod.validation.pipe';
import { paginationSchema } from '../utils/api.util';
import { updateUserSchema } from './utils/admin.validation.schema';
import { UpdateAdminDto } from 'src/dtos/Admin.update.dto';
import { AdminAuthGuard } from '../auth-admin/guards/auth.admin.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('admin')
@UseGuards(AdminAuthGuard)
@ApiTags('Admins')
@ApiBearerAuth('JWT-auth')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  findAll(
    @Query(new ZodValidationPipe(paginationSchema)) query: PaginationQueryType,
  ) {
    return this.adminService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateUserSchema))
    adminUpdatePayload: UpdateAdminDto,
  ) {
    return this.adminService.update(id, adminUpdatePayload);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const removedUser = await this.adminService.delete(id);
    return Boolean(removedUser);
  }
}
