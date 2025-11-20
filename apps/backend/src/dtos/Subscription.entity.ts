import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { PaymentEntity } from "./Payment.entity";
import { User, PlanType, SubscriptionStatus, Payment } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Subscription
export class SubscriptionEntity {
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

  @ApiProperty({ enum: PlanType })
  // Field: plan, Type: PlanType
  @Column()
  plan: PlanType;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: startDate, Type: Date
  @Column()
  startDate: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: endDate, Type: Date
  @Column()
  endDate: Date;

  @ApiProperty({ enum: SubscriptionStatus })
  // Field: status, Type: SubscriptionStatus
  @Column()
  status: SubscriptionStatus;

  @ApiProperty({ type: "string" })
  // Field: features, Type: string[]
  @Column()
  features: string[];

  @ApiProperty({ type: "string", nullable: true })
  // Field: billingPeriod, Type: string
  @Column()
  billingPeriod?: string;

  @ApiProperty({ type: PaymentEntity })
  // Field: payments, Type: Payment[]
  @Column()
  payments: Payment[];
}
