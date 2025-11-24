import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Role, Sport, Gender, PlanType } from '@shared/prisma';

export interface MonitorFilters {
  dateFrom?: string;
  dateTo?: string;
}

export interface SummaryResponse {
  totalAccounts: number;
  activeAccounts: number;
  newAccountsDaily: number;
  totalPosts: number;
  newPostsDaily: number;
}

export interface AccountsCategoriesResponse {
  coaches: number;
  players: number;
  fans: number;
}

export interface SubscriptionsResponse {
  proAccounts: number;
  regularAccounts: number;
  monthlySubscriptions: number;
}

export interface GenderChartResponse {
  label: string;
  value: number;
}

export interface MediaCountResponse {
  totalVideos: number;
  totalImages: number;
}

export interface TopEngagementResponse {
  id: string;
  title: string;
  engagementScore: number;
}

export interface SportsChartResponse {
  sport: string;
  percentage: number;
}

@Injectable()
export class MonitorService {
  constructor(private prisma: PrismaService) {}

  /**
   * B1: جلب الإحصائيات الأساسية للمنصة
   */
  async getSummary(filters: MonitorFilters): Promise<SummaryResponse> {
    const { dateFrom, dateTo } = this.parseDateFilters(filters);

    // حساب إجمالي الحسابات
    const totalAccounts = await this.prisma.user.count();

    // حساب الحسابات النشطة
    const activeAccounts = await this.prisma.user.count({
      where: {
        status: 'ACTIVE',
        isOnline: true,
      },
    });

    // حساب الحسابات الجديدة اليوم
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const newAccountsDaily = await this.prisma.user.count({
      where: {
        createdAt: {
          gte: today,
        },
      },
    });

    // حساب إجمالي المنشورات
    const totalPosts = await this.prisma.post.count({
      where: dateFrom && dateTo ? {
        createdAt: {
          gte: dateFrom,
          lte: dateTo,
        },
      } : undefined,
    });

    // حساب المنشورات الجديدة اليوم
    const newPostsDaily = await this.prisma.post.count({
      where: {
        createdAt: {
          gte: today,
        },
      },
    });

    return {
      totalAccounts,
      activeAccounts,
      newAccountsDaily,
      totalPosts,
      newPostsDaily,
    };
  }

  /**
   * B2: جلب عدد الحسابات لكل فئة مستخدم
   */
  async getAccountsCategories(filters: MonitorFilters): Promise<AccountsCategoriesResponse> {
    const { dateFrom, dateTo } = this.parseDateFilters(filters);

    const whereClause = dateFrom && dateTo ? {
      createdAt: {
        gte: dateFrom,
        lte: dateTo,
      },
    } : {};

    const [coaches, players, fans] = await Promise.all([
      this.prisma.user.count({
        where: {
          ...whereClause,
          role: Role.COACH,
        },
      }),
      this.prisma.user.count({
        where: {
          ...whereClause,
          role: Role.PLAYER,
        },
      }),
      // Fans = AGENT, SCOUT, COMPANY, CLUB
      this.prisma.user.count({
        where: {
          ...whereClause,
          role: {
            in: [Role.AGENT, Role.SCOUT, Role.COMPANY, Role.CLUB, Role.GUEST],
          },
        },
      }),
    ]);

    return {
      coaches,
      players,
      fans,
    };
  }

  /**
   * B3: جلب إحصائيات الحسابات الاحترافية والاشتراكات
   */
  async getSubscriptions(filters: MonitorFilters): Promise<SubscriptionsResponse> {
    const { dateFrom, dateTo } = this.parseDateFilters(filters);

    const whereClause = dateFrom && dateTo ? {
      createdAt: {
        gte: dateFrom,
        lte: dateTo,
      },
    } : {};

    // حساب الحسابات الاحترافية (PRO)
    const proAccounts = await this.prisma.subscription.count({
      where: {
        ...whereClause,
        plan: {
          in: [PlanType.PREMIUM, PlanType.PROFESSIONAL],
        },
        status: 'ACTIVE',
      },
    });

    // حساب الحسابات العادية
    const totalUsers = await this.prisma.user.count({
      where: whereClause,
    });
    const regularAccounts = totalUsers - proAccounts;

    // حساب الاشتراكات الشهرية والسنوية
    const monthlySubscriptions = await this.prisma.subscription.count({
      where: {
        ...whereClause,
        billingPeriod: 'monthly',
        status: 'ACTIVE',
      },
    });

    return {
      proAccounts,
      regularAccounts,
      monthlySubscriptions,
    };
  }

  /**
   * B4: جلب بيانات الرسم البياني الدائري لتوزيع المستخدمين حسب الجنس
   */
  async getGenderChart(filters: MonitorFilters): Promise<GenderChartResponse[]> {
    const { dateFrom, dateTo } = this.parseDateFilters(filters);

    const whereClause = dateFrom && dateTo ? {
      createdAt: {
        gte: dateFrom,
        lte: dateTo,
      },
    } : {};

    const genderCounts = await this.prisma.user.groupBy({
      by: ['gender'],
      where: {
        ...whereClause,
        gender: {
          not: null,
        },
      },
      _count: true,
    });

    return genderCounts.map((item) => ({
      label: item.gender === Gender.MALE ? 'Male' : 
             item.gender === Gender.FEMALE ? 'Female' : 
             'Children',
      value: item._count,
    }));
  }

  /**
   * B5: جلب العدد الإجمالي للفيديوهات والصور على المنصة
   */
  async getMediaCount(filters: MonitorFilters): Promise<MediaCountResponse> {
    const { dateFrom, dateTo } = this.parseDateFilters(filters);

    const whereClause = dateFrom && dateTo ? {
      createdAt: {
        gte: dateFrom,
        lte: dateTo,
      },
    } : {};

    const [totalVideos, totalImages] = await Promise.all([
      this.prisma.post.count({
        where: {
          ...whereClause,
          video: {
            not: null,
          },
        },
      }),
      this.prisma.post.count({
        where: {
          ...whereClause,
          image: {
            not: null,
          },
        },
      }),
    ]);

    return {
      totalVideos,
      totalImages,
    };
  }

  /**
   * B6: جلب قائمة بأكثر 10 أو 20 منشوراً تفاعلاً
   */
  async getTopEngagement(
    filters: MonitorFilters,
    limit: number = 10,
  ): Promise<TopEngagementResponse[]> {
    const { dateFrom, dateTo } = this.parseDateFilters(filters);

    const whereClause = dateFrom && dateTo ? {
      createdAt: {
        gte: dateFrom,
        lte: dateTo,
      },
    } : {};

    // جلب المنشورات مع عدد التفاعلات والتعليقات
    const posts = await this.prisma.post.findMany({
      where: whereClause,
      select: {
        id: true,
        text: true,
        _count: {
          select: {
            reactions: true,
            comments: true,
            views: true,
          },
        },
      },
      take: limit * 3, // نأخذ أكثر للحساب
    });

    // حساب engagement score
    const postsWithScore = posts.map((post) => ({
      id: post.id,
      title: post.text?.substring(0, 50) || 'No Title',
      engagementScore:
        post._count.reactions * 2 +
        post._count.comments * 3 +
        post._count.views,
    }));

    // ترتيب حسب الـ score
    return postsWithScore
      .sort((a, b) => b.engagementScore - a.engagementScore)
      .slice(0, limit);
  }

  /**
   * B7: جلب بيانات الرسم البياني الدائري لتوزيع المستخدمين أو المنشورات حسب نوع الرياضة
   */
  async getSportsChart(filters: MonitorFilters): Promise<SportsChartResponse[]> {
    const { dateFrom, dateTo } = this.parseDateFilters(filters);

    const whereClause = dateFrom && dateTo ? {
      createdAt: {
        gte: dateFrom,
        lte: dateTo,
      },
    } : {};

    // جلب توزيع المستخدمين حسب الرياضة
    const sportCounts = await this.prisma.user.groupBy({
      by: ['sport'],
      where: {
        ...whereClause,
        sport: {
          not: null,
        },
      },
      _count: true,
    });

    const totalUsers = sportCounts.reduce((sum, item) => sum + item._count, 0);

    return sportCounts.map((item) => ({
      sport: item.sport as string,
      percentage: Math.round((item._count / totalUsers) * 100),
    }));
  }

  /**
   * دالة مساعدة لتحليل فلاتر التاريخ
   */
  private parseDateFilters(filters: MonitorFilters): {
    dateFrom?: Date;
    dateTo?: Date;
  } {
    const dateFrom = filters.dateFrom ? new Date(filters.dateFrom) : undefined;
    const dateTo = filters.dateTo ? new Date(filters.dateTo) : undefined;

    return { dateFrom, dateTo };
  }
}

