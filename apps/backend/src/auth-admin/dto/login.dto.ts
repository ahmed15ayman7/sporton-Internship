import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty({ type: "string" })
    email: string;
    @ApiProperty({ type: "string" })
    password: string;
    @ApiProperty({ type: "boolean" })
    rememberMe: boolean;
    @ApiProperty({ type: "string", nullable: true })
    device?: string;
    @ApiProperty({ type: "string", nullable: true })
    ip?: string;
    @ApiProperty({ type: "string", nullable: true })
    browser?: string;
    @ApiProperty({ type: "string", nullable: true })
    os?: string;
}
