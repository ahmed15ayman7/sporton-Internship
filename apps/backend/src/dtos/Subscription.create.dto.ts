import { ApiProperty } from "@nestjs/swagger";
import { User, PlanType, SubscriptionStatus, Payment } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for Subscription
export class CreateSubscriptionDto {
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

  @ApiProperty({ type: "string" })
  // Field: billingPeriod, Type: string
  @Column()
  billingPeriod?: string;
}
