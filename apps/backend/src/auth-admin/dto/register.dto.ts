import { ApiProperty } from "@nestjs/swagger";
import { AdminRole } from '@shared/prisma';

export class RegisterDto {
    @ApiProperty({ type: "string" })
    email: string;
    @ApiProperty({ type: "string" })
    phone: string;
    @ApiProperty({ type: "string" })
    password: string;
    @ApiProperty({ enum: AdminRole })
    role: AdminRole;
    @ApiProperty({ type: "string" })
    name: string;
    @ApiProperty({ type: "string", nullable: true })
    image?: string;
}

