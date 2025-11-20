import { Module } from '@nestjs/common';
import { AuthAdminService } from './auth-admin.service';
import { AuthAdminController } from './auth-admin.controller';
import { AdminsModule } from '../modules/admin/admins.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EnvVariables } from 'src/types/declartion-mergin';

@Module({
  controllers: [AuthAdminController],
  providers: [AuthAdminService],
  imports: [
    AdminsModule,
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
