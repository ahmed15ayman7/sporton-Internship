import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import type { Request } from 'express';
import { AuthService } from './auth.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';

import type { LoginDTO, RegisterDTO, UserResponseDTO } from './dto/auth.dto';
import { IsPublic } from 'src/decorators/public.decorator';
import { registerValidationSchema } from './utils/auth.validation.schema';
import { ZodValidationPipe } from 'src/pipes/zod.validation.pipe';
import { CreateUserDto } from 'src/dtos/User.create.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @IsPublic(true)
  register(
    @Body(new ZodValidationPipe(registerValidationSchema))
    registerDto: RegisterDTO,
  ): Promise<UserResponseDTO> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @IsPublic(true)
  login(@Body() loginDto: LoginDTO): Promise<UserResponseDTO> {
    return this.authService.login(loginDto);
  }

  @Get()
  validate(@Req() request: Request): UserResponseDTO {
    return this.authService.validate(request.user!);
  }

  @Post('refresh')
  @IsPublic(true)
  async refresh(
    @Body('refreshToken') refreshToken: string,
  ): Promise<UserResponseDTO> {
    return this.authService.refreshTokens(refreshToken);
  }
}
