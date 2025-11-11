import { Injectable, UnauthorizedException } from '@nestjs/common';

import { LoginDTO, RegisterDTO, UserResponseDTO } from './dto/auth.dto';
import * as argon from 'argon2';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

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

    // Create jwt token
    const token = this.generateJwtToken(createdUser.id);

    return {
      userData:
        this.userService.mapUserWithoutPasswordAndCastBigint(createdUser),
      token,
    };
  }

  async login(loginDto: LoginDTO): Promise<UserResponseDTO> {
    // find user by email
    const foundUser = await this.userService.findByEmailOrThrow(loginDto.email);

    if (foundUser.isDeleted) {
      throw new UnauthorizedException('Invalid credentials');
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

    // generate jwt token
    const token = this.generateJwtToken(foundUser.id);
    // return user data and token
    return {
      userData: this.userService.mapUserWithoutPasswordAndCastBigint(foundUser),
      token,
    };
  }

  validate(userPayload: UserResponseDTO['userData']) {
    // generate jwt token
    const token = this.generateJwtToken(userPayload.id);
    // return user data and token
    return {
      userData: userPayload,
      token,
    };
  }

  private hashPassword(password: string) {
    return argon.hash(password);
  }
  private verifyPassword(password: string, hashedPassword: string) {
    return argon.verify(hashedPassword, password);
  }
  private generateJwtToken(userId: string) {
    return this.jwtService.sign({ sub: userId }, { expiresIn: '7d' });
  }
}
