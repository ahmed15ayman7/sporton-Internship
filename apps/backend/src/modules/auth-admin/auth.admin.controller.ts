import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { AuthService } from './auth.admin.service';
import type { AdminResponseDTO, LoginDTO } from './dto/auth.admin.dto';
import { IsPublic } from 'src/decorators/public.decorator';
import {
  registerValidationSchema,
  loginValidationSchema,
} from './utils/auth.admin.validation.schema';
import { ZodValidationPipe } from 'src/pipes/zod.validation.pipe';
import { CreateAdminDto } from 'src/dtos/Admin.create.dto';
import { AdminAuthGuard } from './guards/auth.admin.guard';

@Controller('authadmin')
@UseGuards(AdminAuthGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @IsPublic(true)
  register(
    @Body(new ZodValidationPipe(registerValidationSchema))
    registerDto: CreateAdminDto,
  ) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @IsPublic(true)
  login(
    @Body(new ZodValidationPipe(loginValidationSchema))
    loginDto: LoginDTO,
  ): Promise<AdminResponseDTO> {
    return this.authService.login(loginDto);
  }

  @Get()
  validate(@Req() request: Request): AdminResponseDTO {
    return this.authService.validate(request.admin!);
  }

  @Post('refresh')
  @IsPublic(true)
  async refresh(@Body('refreshToken') refreshToken: string): Promise<AdminResponseDTO> {
    return this.authService.refreshTokens(refreshToken);
  }
}
