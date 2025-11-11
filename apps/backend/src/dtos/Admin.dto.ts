import { ApiProperty } from "@nestjs/swagger";
import { LoginHistoryEntity } from "./LoginHistory.entity";
import { NotificationEntity } from "./Notification.entity";
import {
  AdminRole,
  AdminStatus,
  LoginHistory,
  Notification,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Admin
export class AdminDto {
  @ApiProperty({ type: "string" })
  // Field: id, Type: string
  @Column()
  id: string;

  @ApiProperty({ type: "string" })
  // Field: email, Type: string
  @Column()
  email: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: phone, Type: string
  @Column()
  phone?: string;

  @ApiProperty({ type: "string" })
  // Field: password, Type: string
  @Column()
  password: string;

  @ApiProperty({ enum: AdminRole })
  // Field: role, Type: AdminRole
  @Column()
  role: AdminRole;

  @ApiProperty({ enum: AdminStatus })
  // Field: status, Type: AdminStatus
  @Column()
  status: AdminStatus;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;

  @ApiProperty({ type: LoginHistoryEntity })
  // Field: loginHistory, Type: LoginHistory[]
  @Column()
  loginHistory: LoginHistory[];

  @ApiProperty({ type: NotificationEntity })
  // Field: notifications, Type: Notification[]
  @Column()
  notifications: Notification[];

  @ApiProperty({ type: "string" })
  // Field: name, Type: string
  @Column()
  name: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: image, Type: string
  @Column()
  image?: string;
}
