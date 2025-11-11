import { ApiProperty } from "@nestjs/swagger";
import { AdminRole } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for Admin
export class CreateAdminDto {
  @ApiProperty({ type: "string" })
  // Field: name, Type: string
  @Column()
  name: string;

  @ApiProperty({ type: "string" })
  // Field: email, Type: string
  @Column()
  email: string;

  @ApiProperty({ type: "string" })
  // Field: password, Type: string
  @Column()
  password: string;

  @ApiProperty({ enum: AdminRole })
  // Field: role, Type: AdminRole
  @Column()
  role: AdminRole;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;
}
