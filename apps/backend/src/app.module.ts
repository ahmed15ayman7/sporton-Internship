import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthAdminModule } from './modules/auth-admin/auth.admin.module';
import { UserModule } from './modules/user/user.module';
import { ContactModule } from './modules/contact/contact.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core/constants';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { AdminModule } from './modules/admin/admin.module';
import { AdminAuthGuard } from './modules/auth-admin/guards/auth.admin.guard';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    AuthAdminModule,
    AdminModule,
    UserModule,
    ContactModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AdminAuthGuard,
    },
  ],
})
export class AppModule {}
