import { Injectable, UnauthorizedException } from '@nestjs/common';

import {
  AdminResponseDTO,
  LoginDTO,
  RegisterAdminDTO,
} from './dto/auth.admin.dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { AdminStatus } from '@shared/prisma';
import { AdminService } from '../admin/admin.service';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService,
  ) {}
  async register(registerDto: RegisterAdminDTO) {
    // hash password
    const hashedPassword = await this.hashPassword(registerDto.password);

    const createdAdmin = await this.adminService.create({
      ...registerDto,
      password: hashedPassword,
    });

    // Create jwt tokens
    const { accessToken, refreshToken } = this.generateTokens(createdAdmin.id);

    return {
      userData: this.adminService.mapUserWithoutPassword(createdAdmin),
      accessToken,
      refreshToken,
    };
  }

  async login(loginDto: LoginDTO): Promise<AdminResponseDTO> {
    // find user by email
    const foundAdmin = await this.adminService.findByEmailOrThrow(
      loginDto.email,
    );

    if (foundAdmin.status === AdminStatus.TERMINATED) {
      throw new UnauthorizedException('Admin is TERMINATED');
    }
    // verify password with argon
    const isPasswordValid = await this.verifyPassword(
      loginDto.password,
      foundAdmin.password,
    );
    // throw error if not match
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // generate jwt tokens
    const { accessToken, refreshToken } = this.generateTokens(foundAdmin.id);
    // return user data and tokens
    return {
      adminData: this.adminService.mapUserWithoutPassword(foundAdmin),
      accessToken,
      refreshToken,
    };
  }

  validate(userPayload: AdminResponseDTO['adminData']) {
    // generate jwt tokens
    const { accessToken, refreshToken } = this.generateTokens(userPayload.id);
    // return user data and tokens
    return {
      adminData: userPayload,
      accessToken,
      refreshToken,
    };
  }

  // Refresh tokens using refresh token
  async refreshTokens(refreshToken: string): Promise<AdminResponseDTO> {
    try {
      // Verify refresh token
      const payload = this.jwtService.verify(refreshToken);

      // Check if it's a refresh token
      if (payload.type !== 'refresh') {
        throw new UnauthorizedException('Invalid token type');
      }

      // Get admin from database (without password)
      const adminData = await this.adminService.findOne(payload.sub);

      if (!adminData) {
        throw new UnauthorizedException('Admin not found');
      }

      // Generate new tokens
      const tokens = this.generateTokens(adminData.id);

      return {
        adminData,
        ...tokens,
      };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private hashPassword(password: string) {
    return argon.hash(password);
  }
  private verifyPassword(password: string, hashedPassword: string) {
    return argon.verify(hashedPassword, password);
  }

  // Generate Access Token (صلاحية قصيرة: 15 دقيقة)
  private generateAccessToken(userId: string) {
    return this.jwtService.sign(
      { sub: userId, type: 'access' },
      { expiresIn: '15m' },
    );
  }

  // Generate Refresh Token (صلاحية طويلة: 7 أيام)
  private generateRefreshToken(userId: string) {
    return this.jwtService.sign(
      { sub: userId, type: 'refresh' },
      { expiresIn: '7d' },
    );
  }

  // Generate both tokens
  private generateTokens(userId: string) {
    return {
      accessToken: this.generateAccessToken(userId),
      refreshToken: this.generateRefreshToken(userId),
    };
  }
}
