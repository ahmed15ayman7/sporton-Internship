import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { ReactionEntity } from "./Reaction.entity";
import { CommentEntity } from "./Comment.entity";
import { PostEntity } from "./Post.entity";
import { EngagementMetricsEntity } from "./EngagementMetrics.entity";
import {
  User,
  PostVisibility,
  Reaction,
  Comment,
  Post,
  EngagementMetrics,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Post
export class PostDto {
  @ApiProperty({ type: "string" })
  // Field: id, Type: string
  @Column()
  id: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: text, Type: string
  @Column()
  text?: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: image, Type: string
  @Column()
  image?: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: video, Type: string
  @Column()
  video?: string;

  @ApiProperty({ type: "boolean" })
  // Field: isAchievement, Type: boolean
  @Column()
  isAchievement: boolean;

  @ApiProperty({ type: UserEntity })
  // Field: author, Type: User
  @Column()
  author: User;

  @ApiProperty({ type: "string" })
  // Field: authorId, Type: string
  @Column()
  authorId: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ enum: PostVisibility })
  // Field: visibility, Type: PostVisibility
  @Column()
  visibility: PostVisibility;

  @ApiProperty({ type: "boolean" })
  // Field: isSponsored, Type: boolean
  @Column()
  isSponsored: boolean;

  @ApiProperty({ type: "boolean" })
  // Field: isJob, Type: boolean
  @Column()
  isJob: boolean;

  @ApiProperty({ type: "boolean" })
  // Field: isEPortofolio, Type: boolean
  @Column()
  isEPortofolio: boolean;

  @ApiProperty({ type: "boolean" })
  // Field: isFake, Type: boolean
  @Column()
  isFake: boolean;

  @ApiProperty({ type: "string" })
  // Field: tags, Type: string[]
  @Column()
  tags: string[];

  @ApiProperty({ type: "string", nullable: true })
  // Field: location, Type: string
  @Column()
  location?: string;

  @ApiProperty({ type: ReactionEntity })
  // Field: reactions, Type: Reaction[]
  @Column()
  reactions: Reaction[];

  @ApiProperty({ type: CommentEntity })
  // Field: comments, Type: Comment[]
  @Column()
  comments: Comment[];

  @ApiProperty({ type: UserEntity })
  // Field: views, Type: User[]
  @Column()
  views: User[];

  @ApiProperty({ type: PostEntity })
  // Field: reposts, Type: Post[]
  @Column()
  reposts: Post[];

  @ApiProperty({ type: PostEntity, nullable: true })
  // Field: repostedFrom, Type: Post
  @Column()
  repostedFrom?: Post;

  @ApiProperty({ type: "string", nullable: true })
  // Field: repostedFromId, Type: string
  @Column()
  repostedFromId?: string;

  @ApiProperty({ type: EngagementMetricsEntity })
  // Field: engagementMetrics, Type: EngagementMetrics[]
  @Column()
  engagementMetrics: EngagementMetrics[];
}
