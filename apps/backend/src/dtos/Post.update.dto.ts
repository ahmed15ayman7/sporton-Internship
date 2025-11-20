import { ApiProperty } from "@nestjs/swagger";
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
// This is the Update Entity for Post
export class UpdatePostDto {
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

  @ApiProperty({ type: "string", nullable: true })
  // Field: repostedFromId, Type: string
  @Column()
  repostedFromId?: string;
}
