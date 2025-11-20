import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import type { Request } from 'express';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';

import type { LoginDTO, RegisterDTO, UserResponseDTO } from './dto/auth.dto';
import { IsPublic } from 'src/decorators/public.decorator';
import { registerValidationSchema } from './utils/auth.validation.schema';
import { ZodValidationPipe } from 'src/pipes/zod.validation.pipe';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @IsPublic(true)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({
    description: 'User registration data',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'John Doe' },
        email: { type: 'string', example: 'john@example.com' },
        password: { type: 'string', example: 'Password123!' },
      },
      required: ['name', 'email', 'password'],
    },
  })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  register(
    @Body(new ZodValidationPipe(registerValidationSchema))
    registerDto: RegisterDTO,
  ): Promise<UserResponseDTO> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @IsPublic(true)
  @ApiOperation({ summary: 'User login' })
  @ApiBody({
    description: 'User login credentials',
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'john@example.com' },
        password: { type: 'string', example: 'Password123!' },
      },
      required: ['email', 'password'],
    },
  })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  login(@Body() loginDto: LoginDTO): Promise<UserResponseDTO> {
    return this.authService.login(loginDto);
  }

  @Get()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Validate JWT token' })
  @ApiResponse({ status: 200, description: 'Token is valid' })
  @ApiResponse({ status: 401, description: 'Invalid or expired token' })
  validate(@Req() request: Request): UserResponseDTO {
    return this.authService.validate(request.user!);
  }

  @Post('refresh')
  @IsPublic(true)
  @ApiOperation({ summary: 'Refresh access token using refresh token' })
  @ApiResponse({ status: 200, description: 'Tokens refreshed successfully' })
  @ApiResponse({ status: 401, description: 'Invalid refresh token' })
  async refresh(@Body('refreshToken') refreshToken: string): Promise<UserResponseDTO> {
    return this.authService.refreshTokens(refreshToken);
  }
}
