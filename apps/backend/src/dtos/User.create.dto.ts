import { ApiProperty } from "@nestjs/swagger";
import { Role, UserStatus, Sport, Notification } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for User
export class CreateUserDto {
  @ApiProperty({ type: "string" })
  // Field: email, Type: string
  @Column()
  email: string;

  @ApiProperty({ type: "string" })
  // Field: phone, Type: string
  @Column()
  phone?: string;

  @ApiProperty({ type: "string" })
  // Field: password, Type: string
  @Column()
  password: string;

  @ApiProperty({ enum: Role })
  // Field: role, Type: Role
  @Column()
  role: Role;

  @ApiProperty({ enum: UserStatus })
  // Field: status, Type: UserStatus
  @Column()
  status: UserStatus;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;

  @ApiProperty({ type: "string" })
  // Field: name, Type: string
  @Column()
  name: string;

  @ApiProperty({ type: "string" })
  // Field: image, Type: string
  @Column()
  image?: string;

  @ApiProperty({ type: "string" })
  // Field: cover, Type: string
  @Column()
  cover?: string;

  @ApiProperty({ type: "string" })
  // Field: country, Type: string
  @Column()
  country?: string;

  @ApiProperty({ type: "string" })
  // Field: city, Type: string
  @Column()
  city?: string;

  @ApiProperty({ type: "string" })
  // Field: language, Type: string
  @Column()
  language?: string;

  @ApiProperty({ enum: Sport })
  // Field: sport, Type: Sport
  @Column()
  sport?: Sport;

  @ApiProperty({ type: "boolean" })
  // Field: isOnline, Type: boolean
  @Column()
  isOnline: boolean;

  @ApiProperty({ type: "boolean" })
  // Field: isChoseRole, Type: boolean
  @Column()
  isChoseRole: boolean;

  @ApiProperty({ type: "boolean" })
  // Field: isProfileCompleted, Type: boolean
  @Column()
  isProfileCompleted: boolean;
}
