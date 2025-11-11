import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { AdminEntity } from "./Admin.entity";
import { NotificationActionEntity } from "./NotificationAction.entity";
import {
  User,
  Admin,
  NotificationType,
  Priority,
  NotificationAction,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Notification
export class NotificationDto {
  @ApiProperty({ type: "string" })
  // Field: id, Type: string
  @Column()
  id: string;

  @ApiProperty({ type: UserEntity, nullable: true })
  // Field: user, Type: User
  @Column()
  user?: User;

  @ApiProperty({ type: "string", nullable: true })
  // Field: userId, Type: string
  @Column()
  userId?: string;

  @ApiProperty({ type: AdminEntity, nullable: true })
  // Field: admin, Type: Admin
  @Column()
  admin?: Admin;

  @ApiProperty({ type: "string", nullable: true })
  // Field: adminId, Type: string
  @Column()
  adminId?: string;

  @ApiProperty({ enum: NotificationType })
  // Field: type, Type: NotificationType
  @Column()
  type: NotificationType;

  @ApiProperty({ type: "string" })
  // Field: title, Type: string
  @Column()
  title: string;

  @ApiProperty({ type: "string" })
  // Field: content, Type: string
  @Column()
  content: string;

  @ApiProperty({ additionalProperties: true, type: "object", nullable: true })
  // Field: data, Type: object
  @Column()
  data?: object;

  @ApiProperty({ type: "boolean" })
  // Field: isRead, Type: boolean
  @Column()
  isRead: boolean;

  @ApiProperty({ type: "boolean" })
  // Field: isArchived, Type: boolean
  @Column()
  isArchived: boolean;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time", nullable: true })
  // Field: readAt, Type: Date
  @Column()
  readAt?: Date;

  @ApiProperty({ enum: Priority })
  // Field: priority, Type: Priority
  @Column()
  priority: Priority;

  @ApiProperty({ type: NotificationActionEntity, nullable: true })
  // Field: action, Type: NotificationAction
  @Column()
  action?: NotificationAction;

  @ApiProperty({ type: UserEntity, nullable: true })
  // Field: sender, Type: User
  @Column()
  sender?: User;

  @ApiProperty({ type: "string", nullable: true })
  // Field: senderId, Type: string
  @Column()
  senderId?: string;

  @ApiProperty({ type: "string", format: "date-time", nullable: true })
  // Field: expiresAt, Type: Date
  @Column()
  expiresAt?: Date;
}
