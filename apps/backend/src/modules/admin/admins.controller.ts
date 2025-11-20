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
import { AdminsService } from './admins.service';
import { PaginationQueryType } from 'src/types/util.types';
import { updateAdminDTO } from './dto/user.dto';
import { ZodValidationPipe } from 'src/pipes/zod.validation.pipe';
import { paginationSchema } from '../utils/api.util';
import { updateUserSchema } from './utils/admin.validation.schema';
import { UpdateAdminDto } from 'src/dtos/Admin.update.dto';
import { AdminAuthGuard } from '../../auth-admin/guards/jwt-auth.admin.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BaseAdminController } from 'src/common/controllers/base-admin.controller';
import { Admin } from '@shared/prisma';

@Controller('admins')
@UseGuards(AdminAuthGuard)
@ApiTags('Admins')
@ApiBearerAuth('JWT-auth')
export class AdminsController extends BaseAdminController<Admin> {
  constructor(adminsService: AdminsService) {
    super(adminsService);
  }

}
