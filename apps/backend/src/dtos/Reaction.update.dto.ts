import { ApiProperty } from "@nestjs/swagger";
import { EmojiType, User, Post, Comment } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for Reaction
export class UpdateReactionDto {
  @ApiProperty({ enum: EmojiType })
  // Field: emoji, Type: EmojiType
  @Column()
  emoji: EmojiType;

  @ApiProperty({ type: "string" })
  // Field: userId, Type: string
  @Column()
  userId: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: postId, Type: string
  @Column()
  postId?: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: commentId, Type: string
  @Column()
  commentId?: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;
}
