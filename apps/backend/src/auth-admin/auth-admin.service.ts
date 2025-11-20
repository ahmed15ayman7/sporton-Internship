import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AdminsService } from '../modules/admin/admins.service';
import * as bcrypt from 'bcryptjs';
import { Admin } from '@shared/prisma';
import { RegisterDto } from './dto/register.dto';
import { UpdateAdminDto } from 'src/dtos/Admin.update.dto';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class AuthAdminService {
    constructor(
        private adminsService: AdminsService,
        private jwtService: JwtService,
        private configService: ConfigService,
        private prisma: PrismaService,
    ) { }

    async validateAdmin(email: string, password: string): Promise<any> {
        const admin = await this.adminsService.findByEmail(email);
        if (admin && (await bcrypt.compare(password, admin.password))) {
            const { password, ...result } = admin;
            return result;
        }
        return null;
    }

    async login(admin: Admin,rememberMe:boolean,device?:string,ip?:string,browser?:string,os?:string) {
        const payload = { email: admin.email, sub: admin.id };
        const access_token = this.jwtService.sign(payload);
        const refresh_token = this.generateRefreshToken(payload);
        await this.prisma.loginHistory.create({
            data: {
                adminId: admin.id,
                device: device,
                ip: ip,
                browser: browser,
                os: os,
            },
            include: {
                admin: true,
            },
        });
        if(rememberMe){
            this.jwtService.sign(payload, {
                secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
                expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION'),
            });
        }
        return {
            access_token: access_token,
            refresh_token: refresh_token,
        };
    }

    async register(registerDto: RegisterDto) {
        const admin = await this.adminsService.create(registerDto);
        return this.login(admin,true);
    }

    async refresh_token(token: string) {
        try {
            const payload = this.jwtService.verify(token, {
                secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
            });
            const admin = await this.adminsService.findOne(payload.sub);
            if (!admin) {
                throw new UnauthorizedException();
            }
            return this.login(admin,false);
        } catch {
            throw new UnauthorizedException();
        }
    }

    private generateRefreshToken(payload: { sub: string; }): string {
        return this.jwtService.sign(payload, {
            secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
            expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION'),
        });
    }
    async forgotPassword(email: string,) {
        const admin = await this.adminsService.findByEmail(email);
        if (!admin) {
            throw new NotFoundException('Admin not found');
        }
        console.log(admin);
        const token = await this.jwtService.signAsync({ email: admin.email }, { expiresIn: '1h' });
        const resetPasswordUrl = `/reset-password?token=${token}`;
        return resetPasswordUrl;
    }
    async resetPassword(token: string, password: string) {
        const decoded = this.jwtService.verify(token);
        const admin = await this.adminsService.findByEmail(decoded.email);
        if (!admin) {
            throw new NotFoundException('Admin not found');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await this.adminsService.update(admin.id, { password: hashedPassword } as UpdateAdminDto);
        return { message: 'Password reset successfully' };
    }
    async logout() {
        return { message: 'Logout successfully' };
    }
} 