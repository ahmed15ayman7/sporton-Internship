import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { PostEntity } from "./Post.entity";
import { CommentEntity } from "./Comment.entity";
import { EmojiType, User, Post, Comment } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Reaction
export class ReactionDto {
  @ApiProperty({ type: "string" })
  // Field: id, Type: string
  @Column()
  id: string;

  @ApiProperty({ enum: EmojiType })
  // Field: emoji, Type: EmojiType
  @Column()
  emoji: EmojiType;

  @ApiProperty({ type: UserEntity })
  // Field: user, Type: User
  @Column()
  user: User;

  @ApiProperty({ type: "string" })
  // Field: userId, Type: string
  @Column()
  userId: string;

  @ApiProperty({ type: PostEntity, nullable: true })
  // Field: post, Type: Post
  @Column()
  post?: Post;

  @ApiProperty({ type: "string", nullable: true })
  // Field: postId, Type: string
  @Column()
  postId?: string;

  @ApiProperty({ type: CommentEntity, nullable: true })
  // Field: comment, Type: Comment
  @Column()
  comment?: Comment;

  @ApiProperty({ type: "string", nullable: true })
  // Field: commentId, Type: string
  @Column()
  commentId?: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;
}
