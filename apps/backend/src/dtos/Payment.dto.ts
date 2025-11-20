import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { SubscriptionEntity } from "./Subscription.entity";
import { User, PaymentType, PaymentStatus, Subscription } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Payment
export class PaymentDto {
  @ApiProperty({ type: "string" })
  // Field: id, Type: string
  @Column()
  id: string;

  @ApiProperty({ type: UserEntity })
  // Field: user, Type: User
  @Column()
  user: User;

  @ApiProperty({ type: "string" })
  // Field: userId, Type: string
  @Column()
  userId: string;

  @ApiProperty({ type: "number" })
  // Field: amount, Type: number
  @Column()
  amount: number;

  @ApiProperty({ enum: PaymentType })
  // Field: type, Type: PaymentType
  @Column()
  type: PaymentType;

  @ApiProperty({ enum: PaymentStatus })
  // Field: status, Type: PaymentStatus
  @Column()
  status: PaymentStatus;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: date, Type: Date
  @Column()
  date: Date;

  @ApiProperty({ type: "string", nullable: true })
  // Field: description, Type: string
  @Column()
  description?: string;

  @ApiProperty({ type: SubscriptionEntity, nullable: true })
  // Field: subscription, Type: Subscription
  @Column()
  subscription?: Subscription;

  @ApiProperty({ type: "string", nullable: true })
  // Field: subscriptionId, Type: string
  @Column()
  subscriptionId?: string;
}
