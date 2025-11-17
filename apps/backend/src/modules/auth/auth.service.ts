import { Injectable, UnauthorizedException } from '@nestjs/common';

import { LoginDTO, RegisterDTO, UserResponseDTO } from './dto/auth.dto';
import * as argon from 'argon2';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserStatus } from '@shared/prisma';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async register(registerDto: RegisterDTO): Promise<UserResponseDTO> {
    // hash password
    const hashedPassword = await this.hashPassword(registerDto.password);

    const createdUser = await this.userService.create({
      ...registerDto,
      password: hashedPassword,
    });

    if (createdUser.role) {
      createdUser.isChoseRole = true;
    }

    // Create jwt tokens
    const { accessToken, refreshToken } = this.generateTokens(createdUser.id);

    return {
      userData: this.userService.mapUserWithoutPassword(createdUser),
      accessToken,
      refreshToken,
    };
  }

  async login(loginDto: LoginDTO): Promise<UserResponseDTO> {
    // find user by email
    const foundUser = await this.userService.findByEmailOrThrow(loginDto.email);

    if (foundUser.status === UserStatus.BANNED) {
      throw new UnauthorizedException('User is banned');
    }
    // verify password with argon
    const isPasswordValid = await this.verifyPassword(
      loginDto.password,
      foundUser.password,
    );
    // throw error if not match
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Update lastLogin
    await this.userService.updateLastLogin(foundUser.id);
    await this.userService.update(foundUser.id, { isOnline: true });
    // Get the updated user
    const updatedUser = await this.userService.findByEmailOrThrow(
      loginDto.email,
    );
    // generate jwt tokens
    const { accessToken, refreshToken } = this.generateTokens(foundUser.id);

    // return user data and tokens
    return {
      userData: this.userService.mapUserWithoutPassword(updatedUser),
      accessToken,
      refreshToken,
    };
  }

  validate(userPayload: UserResponseDTO['userData']) {
    // generate jwt tokens
    const { accessToken, refreshToken } = this.generateTokens(userPayload.id);
    // return user data and tokens
    return {
      userData: userPayload,
      accessToken,
      refreshToken,
    };
  }

  // Refresh tokens using refresh token
  async refreshTokens(refreshToken: string): Promise<UserResponseDTO> {
    try {
      // Verify refresh token
      const payload = this.jwtService.verify(refreshToken);

      // Check if it's a refresh token
      if (payload.type !== 'refresh') {
        throw new UnauthorizedException('Invalid token type');
      }

      // Get user from database
      const userData = await this.userService.findOne(payload.sub);

      if (!userData) {
        throw new UnauthorizedException('User not found');
      }

      // Generate new tokens
      const tokens = this.generateTokens(userData.id);

      return {
        userData,
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

  private generateAccessToken(userId: string) {
    return this.jwtService.sign(
      { sub: userId, type: 'access' },
      { expiresIn: '15m' },
    );
  }

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
