import { Module } from '@nestjs/common';
import { AuthService } from './auth.admin.service';
import { AuthController } from './auth.admin.controller';
import { AdminModule } from '../admin/admin.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EnvVariables } from 'src/types/declartion-mergin';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    AdminModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: (configService: ConfigService<EnvVariables>) => ({
        secret: configService.getOrThrow('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AuthAdminModule {}
