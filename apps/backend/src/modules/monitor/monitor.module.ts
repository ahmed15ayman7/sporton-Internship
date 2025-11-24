import { Module } from '@nestjs/common';
import { MonitorController } from './monitor.controller';
import { MonitorService } from './monitor.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule,      JwtModule.registerAsync({
    useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_SECRET'),
        signOptions: {
            expiresIn: configService.get<string>('JWT_ACCESS_EXPIRATION'),
        },
    }),
    inject: [ConfigService],
}),],
  controllers: [MonitorController],
  providers: [MonitorService],
  exports: [MonitorService],
})
export class MonitorModule {}

