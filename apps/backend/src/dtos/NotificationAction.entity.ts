import { ApiProperty } from "@nestjs/swagger";
import { NotificationEntity } from "./Notification.entity";
import { Notification, ActionType } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for NotificationAction
export class NotificationActionEntity {
  @ApiProperty({ type: "string" })
  // Field: id, Type: string
  @Column()
  id: string;

  @ApiProperty({ type: NotificationEntity })
  // Field: notification, Type: Notification
  @Column()
  notification: Notification;

  @ApiProperty({ type: "string" })
  // Field: notificationId, Type: string
  @Column()
  notificationId: string;

  @ApiProperty({ enum: ActionType })
  // Field: actionType, Type: ActionType
  @Column()
  actionType: ActionType;

  @ApiProperty({ type: "string", nullable: true })
  // Field: actionUrl, Type: string
  @Column()
  actionUrl?: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: buttonText, Type: string
  @Column()
  buttonText?: string;

  @ApiProperty({ type: "boolean" })
  // Field: completed, Type: boolean
  @Column()
  completed: boolean;

  @ApiProperty({ type: "string", format: "date-time", nullable: true })
  // Field: completedAt, Type: Date
  @Column()
  completedAt?: Date;
}
