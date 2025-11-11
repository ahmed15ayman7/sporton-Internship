import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for User
export class UserDto {
  @ApiProperty({ type: "string" })
  // Field: id, Type: string
  @Column()
  id: string;

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

  @ApiProperty({ enum: Role })
  // Field: role, Type: Role
  @Column()
  role: Role;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "boolean" })
  // Field: isDeleted, Type: boolean
  @Column()
  isDeleted: boolean;
}
