import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AuthAdminModule } from './auth-admin/auth-admin.module';
import { UserModule } from './modules/user/user.module';
import { ContactModule } from './modules/contact/contact.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core/constants';
import { AuthGuard } from './auth/guards/jwt-auth.guard';
import { AdminsModule } from './modules/admin/admins.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    AuthAdminModule,
    AdminsModule,
    UserModule,
    ContactModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  // providers: [
  //   // Global guard for users only
  //   {
  //     provide: APP_GUARD,
  //     useClass: AuthGuard,
  //   },
  //   {
  //     provide: APP_GUARD,
  //     useClass: JwtAuthAdminGuard,
  //   },
  // ],
})
export class AppModule {}
