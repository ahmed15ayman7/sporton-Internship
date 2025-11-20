import { ApiProperty } from "@nestjs/swagger";
import { NotificationEntity } from "./Notification.entity";
import { PostEntity } from "./Post.entity";
import { CommentEntity } from "./Comment.entity";
import { ReactionEntity } from "./Reaction.entity";
import {
  Role,
  UserStatus,
  Sport,
  Notification,
  Post,
  Comment,
  Reaction,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for User
export class UserDto {
  @ApiProperty({ type: "string" })
  // Field: id, Type: string
  @Column()
  id: string;

  @ApiProperty({ type: "string" })
  // Field: email, Type: string
  @Column()
  email: string;

  @ApiProperty({ type: "string", nullable: true })
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

  @ApiProperty({ type: "string", format: "date-time", nullable: true })
  // Field: lastLogin, Type: Date
  @Column()
  lastLogin?: Date;

  @ApiProperty({ type: "string" })
  // Field: name, Type: string
  @Column()
  name: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: image, Type: string
  @Column()
  image?: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: cover, Type: string
  @Column()
  cover?: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: country, Type: string
  @Column()
  country?: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: city, Type: string
  @Column()
  city?: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: language, Type: string
  @Column()
  language?: string;

  @ApiProperty({ enum: Sport, nullable: true })
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

  @ApiProperty({ type: "boolean" })
  // Field: isDeleted, Type: boolean
  @Column()
  isDeleted: boolean;

  @ApiProperty({ type: NotificationEntity })
  // Field: notifications, Type: Notification[]
  @Column()
  notifications: Notification[];

  @ApiProperty({ type: NotificationEntity })
  // Field: notificationsSender, Type: Notification[]
  @Column()
  notificationsSender: Notification[];

  @ApiProperty({ type: PostEntity })
  // Field: posts, Type: Post[]
  @Column()
  posts: Post[];

  @ApiProperty({ type: CommentEntity })
  // Field: comments, Type: Comment[]
  @Column()
  comments: Comment[];

  @ApiProperty({ type: ReactionEntity })
  // Field: reactions, Type: Reaction[]
  @Column()
  reactions: Reaction[];

  @ApiProperty({ type: PostEntity })
  // Field: postsViews, Type: Post[]
  @Column()
  postsViews: Post[];
}
