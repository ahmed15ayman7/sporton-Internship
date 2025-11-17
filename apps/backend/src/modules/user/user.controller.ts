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
import { UserService } from './user.service';
import { PaginationQueryType } from 'src/types/util.types';
import { ZodValidationPipe } from 'src/pipes/zod.validation.pipe';
import { paginationSchema } from '../utils/api.util';
import { updateUserSchema } from './utils/user.validation.schema';
import { UpdateUserDto } from 'src/dtos/User.update.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Get()
  findAll(
    @Query(new ZodValidationPipe(paginationSchema)) query: PaginationQueryType,
  ) {
    return this.userService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateUserSchema))
    userUpdatePayload: UpdateUserDto,
  ) {
    return this.userService.update(id, userUpdatePayload);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const removedUser = await this.userService.delete(id);
    return Boolean(removedUser);
  }
}
