import { Controller, UseGuards, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../../auth/guards/jwt-auth.guard';
import { BaseController } from 'src/common/controllers/base.controller';
import { CustomApiDocs } from 'src/decorators/customApiDocs.decorator';
import { User } from '@shared/prisma';
import { UserService } from './user.service';
import { UpdateUserDto } from 'src/dtos/User.update.dto';
import { CreateUserDto } from 'src/dtos/User.create.dto';
import { UserDto } from 'src/dtos/User.dto';

@ApiTags('Users')
@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard)
@Controller('user')
export class UserController extends BaseController<User,CreateUserDto,UpdateUserDto > {
  constructor(private readonly userService: UserService) {
    super(userService);
}
@Post()
@ApiBearerAuth()
@CustomApiDocs({action: 'إنشاء',summary: 'مستخدم',type: 'create',createDto: CreateUserDto,responseDto: UserDto})
async create(@Body() data: CreateUserDto): Promise<User> {
  return this.userService.create(data);
}
@Put(':id')
@ApiBearerAuth()
@CustomApiDocs({action: 'تحديث',summary: 'مستخدم',type: 'update',updateDto: UpdateUserDto,responseDto: UserDto
})
async update(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<User> {
  return this.userService.update(id, data);
}
@Delete(':id')
@ApiBearerAuth()
@CustomApiDocs({action: 'حذف',summary: 'مستخدم',type: 'none',responseDto: UserDto})
async delete(@Param('id') id: string): Promise<User> {
  return this.userService.delete(id);
}
}