export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'BANNED' | 'PENDING';

export type Sport = 'FOOTBALL' | 'RUNNING' | 'TENNIS' | 'BASKETBALL' | 'SWIMMING' | 'KARATE' | 'DIVING' | 'FITNESS' | 'HORSE_RIDING' | 'CYCLING' | 'SKATING' | 'HANDBALL' | 'GOLF' | 'HOCKEY' | 'CHESS' | 'KUNG_FU' | 'BOXING' | 'BOWLING' | 'VOLLEYBALL' | 'LONG_JUMP';

export type Role = 'PLAYER' | 'COACH' | 'AGENT' | 'CLUB' | 'COMPANY' | 'SCOUT' | 'TRAINER' | 'GUEST';

export type ActionType = 'VIEW' | 'ACCEPT' | 'REJECT' | 'REPLY' | 'CONFIRM' | 'REVIEW' | 'PAY' | 'OTHER';

export type Priority = 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';

export type NotificationType = 'MESSAGE' | 'TRANSFER_OFFER' | 'MATCH_UPDATE' | 'TRAINING_SCHEDULE' | 'CONTRACT_UPDATE' | 'INJURY_UPDATE' | 'TEAM_NEWS' | 'ACHIEVEMENT' | 'SYSTEM' | 'REMINDER' | 'PAYMENT' | 'DOCUMENT' | 'OTHER' | 'REACTION' | 'COMMENT' | 'REPOST' | 'POST' | 'FRIENDSHIP_ACCEPTED' | 'FRIENDSHIP_REQUESTED' | 'VIEW_PROFILE';

export type AdminStatus = 'ACTIVE' | 'INACTIVE' | 'TERMINATED';

export type AdminRole = 'SUPER_ADMIN' | 'ADMIN' | 'MODERATOR' | 'MONITOR' | 'MARKETING';

export type ContentType = 'POST' | 'AD' | 'EVENT' | 'ARTICLE' | 'TRAINING' | 'JOB';

export type PostVisibility = 'PUBLIC' | 'FRIENDS' | 'PRIVATE';

export type EmojiType = 'LOVE' | 'HAHA' | 'LIKE' | 'ANGRY' | 'CLAP';

export type PlanType = 'FREE' | 'BASIC' | 'PREMIUM' | 'PROFESSIONAL';

export type SubscriptionStatus = 'ACTIVE' | 'EXPIRED' | 'CANCELLED' | 'PENDING';

export type PaymentType = 'SUBSCRIPTION' | 'EVENT' | 'TRAINING' | 'ADVERTISEMENT' | 'SPONSORSHIP';

export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';

export interface User {
  id: string;
  email: string;
  phone?: string;
  password: string;
  role: Role | undefined;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  //: البيانات | undefined;
  name: string;
  image?: string;
  cover?: string;
  country?: string;
  city?: string;
  language?: string;
  sport?: Sport | undefined;
  isOnline: boolean;
  isChoseRole: boolean;
  isProfileCompleted: boolean;
  isDeleted: boolean;
  notifications: Notification[] | undefined;
  notificationsSender: Notification[] | undefined;
  posts: Post[] | undefined;
  comments: Comment[] | undefined;
  reactions: Reaction[] | undefined;
  postsViews: Post[] | undefined;
  payments: Payment[] | undefined;
  subscriptions: Subscription[] | undefined;
}

export interface Admin {
  id: string;
  email: string;
  phone?: string;
  password: string;
  role: AdminRole | undefined;
  status: AdminStatus;
  createdAt: Date;
  updatedAt: Date;
  loginHistory: LoginHistory[] | undefined;
  notifications: Notification[] | undefined;
  //: البيانات | undefined;
  name: string;
  image?: string;
}

export interface NotificationAction {
  id: string;
  notification: Notification | undefined;
  notificationId: string;
  actionType: ActionType | undefined;
  actionUrl?: string;
  buttonText?: string;
  completed: boolean;
  completedAt?: Date;
}

export interface Notification {
  id: string;
  user?: User | undefined;
  userId?: string;
  admin?: Admin | undefined;
  adminId?: string;
  type: NotificationType | undefined;
  title: string;
  content: string;
  data?: any;
  isRead: boolean;
  isArchived: boolean;
  createdAt: Date;
  readAt?: Date;
  priority: Priority;
  action?: NotificationAction | undefined;
  sender?: User | undefined;
  senderId?: string;
  expiresAt?: Date;
}

export interface LoginHistory {
  id: string;
  adminId: string;
  admin: Admin | undefined;
  success: boolean;
  ip?: string;
  device?: string;
  location?: string;
  browser?: string;
  os?: string;
  createdAt: Date;
}

export interface ContactUs {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Post {
  id: string;
  text?: string;
  image?: string;
  video?: string;
  isAchievement: boolean;
  author: User | undefined;
  authorId: string;
  createdAt: Date;
  visibility: PostVisibility;
  isSponsored: boolean;
  isJob: boolean;
  isEPortofolio: boolean;
  isFake: boolean;
  tags: string[];
  location?: string;
  reactions: Reaction[] | undefined;
  comments: Comment[] | undefined;
  views: User[] | undefined;
  reposts: Post[] | undefined;
  repostedFrom?: Post | undefined;
  repostedFromId?: string;
  engagementMetrics: EngagementMetrics[] | undefined;
}

export interface EngagementMetrics {
  id: string;
  contentId: string;
  contentType: ContentType | undefined;
  viewCount: number;
  avgTimeSpent: number;
  engagementRate: number;
  bounceRate: number;
  peakHours: any;
  demographics: any;
  createdAt: Date;
  updatedAt: Date;
  content: Post | undefined;
}

export interface Reaction {
  id: string;
  emoji: EmojiType | undefined;
  user: User | undefined;
  userId: string;
  post?: Post | undefined;
  postId?: string;
  comment?: Comment | undefined;
  commentId?: string;
  createdAt: Date;
}

export interface Comment {
  id: string;
  content: string;
  author: User | undefined;
  authorId: string;
  createdAt: Date;
  post?: Post | undefined;
  postId?: string;
  reactions: Reaction[] | undefined;
}

export interface Subscription {
  id: string;
  user: User | undefined;
  userId: string;
  plan: PlanType | undefined;
  startDate: Date;
  endDate: Date;
  status: SubscriptionStatus | undefined;
  features: string[];
  billingPeriod?: string;
  payments: Payment[] | undefined;
}

export interface Payment {
  id: string;
  user: User | undefined;
  userId: string;
  amount: number;
  type: PaymentType | undefined;
  status: PaymentStatus | undefined;
  date: Date;
  description?: string;
  subscription?: Subscription | undefined;
  subscriptionId?: string;
}