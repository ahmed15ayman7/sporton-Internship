import { ApiProperty } from "@nestjs/swagger";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for Contact
export class CreateContactDto {
  @ApiProperty({ type: "string" })
  // Field: name, Type: string
  @Column()
  name: string;

  @ApiProperty({ type: "string" })
  // Field: email, Type: string
  @Column()
  email: string;

  @ApiProperty({ type: "string" })
  // Field: subject, Type: string
  @Column()
  subject?: string;

  @ApiProperty({ type: "string" })
  // Field: message, Type: string
  @Column()
  message: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;

  @ApiProperty({ type: "string" })
  // Field: status, Type: string
  @Column()
  status: string;
}
