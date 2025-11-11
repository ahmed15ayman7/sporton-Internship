import { ApiProperty } from "@nestjs/swagger";
import { AdminEntity } from "./Admin.entity";
import { Admin } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for LoginHistory
export class LoginHistoryEntity {
  @ApiProperty({ type: "string" })
  // Field: id, Type: string
  @Column()
  id: string;

  @ApiProperty({ type: "string" })
  // Field: adminId, Type: string
  @Column()
  adminId: string;

  @ApiProperty({ type: AdminEntity })
  // Field: admin, Type: Admin
  @Column()
  admin: Admin;

  @ApiProperty({ type: "boolean" })
  // Field: success, Type: boolean
  @Column()
  success: boolean;

  @ApiProperty({ type: "string", nullable: true })
  // Field: ip, Type: string
  @Column()
  ip?: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: device, Type: string
  @Column()
  device?: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: location, Type: string
  @Column()
  location?: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: browser, Type: string
  @Column()
  browser?: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: os, Type: string
  @Column()
  os?: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;
}
