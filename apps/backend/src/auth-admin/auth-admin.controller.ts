import { Controller, Post, Body } from '@nestjs/common';
import { AuthAdminService } from './auth-admin.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';
@ApiTags('auth-admin')
@Controller('auth-admin')
export class AuthAdminController {
    constructor(private readonly authAdminService: AuthAdminService) { }

    @Post('login')
    @ApiOperation({ summary: 'Login with email and password' })
    @ApiResponse({ status: 200, description: 'Return JWT tokens.' })
    async login(@Body() loginDto: LoginDto) {
        console.log("loginDto",loginDto)
        const admin = await this.authAdminService.validateAdmin(
            loginDto.email,
            loginDto.password,
        );
        if (!admin) {
            return { statusCode: 401, message: 'Invalid credentials' };
        }
        return this.authAdminService.login(admin,loginDto.rememberMe,loginDto.device,loginDto.ip,loginDto.browser,loginDto.os);
    }

    @Post('register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 200, description: 'Return JWT tokens.' })
    async register(@Body() registerDto: RegisterDto) {
        return this.authAdminService.register(registerDto);
    }

    @Post('refresh')
    @ApiOperation({ summary: 'Refresh access token' })
    @ApiResponse({ status: 200, description: 'Return new JWT tokens.' })
    async refresh(@Body() body: { refresh_token: string }) {
        return this.authAdminService.refresh_token(body.refresh_token);
    }
    @Post('forgot-password')
    async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
        try {
            return this.authAdminService.forgotPassword(forgotPasswordDto.email);
        } catch (error) {
            return { statusCode: 400, message: 'Invalid email' };
        }
    }
    @Post('reset-password')
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
        try {
            return this.authAdminService.resetPassword(resetPasswordDto.token, resetPasswordDto.password);
        } catch (error) {
            return { statusCode: 400, message: 'Invalid token' };
        }
    }
    @Post('logout')
    async logout() {
        return this.authAdminService.logout();
    }

} 