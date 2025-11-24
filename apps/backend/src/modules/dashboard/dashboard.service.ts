// import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../../prisma/prisma.service';
// import { Role, Sport, UserStatus } from '@shared/prisma';

// export interface DashboardFilters {
//   userId?: string;
//   teamId?: string;
//   matchId?: string;
//   sport?: string;
//   role?: string;
//   dateFrom?: string;
//   dateTo?: string;
//   status?: string;
//   category?: string;
//   limit?: number;
//   offset?: number;
// }

// export interface DashboardMetrics {
//   totalUsers: number;
//   totalTeams: number;
//   totalMatches: number;
//   totalPosts: number;
//   totalProducts: number;
//   totalOrders: number;
//   totalRevenue: number;
//   activeUsers: number;
//   pendingApprovals: number;
// }

// export interface DashboardOverview {
//   metrics: DashboardMetrics;
//   recentActivity: any[];
//   topPerformers: any[];
//   upcomingEvents: any[];
//   systemHealth: {
//     status: string;
//     lastUpdate: Date;
//     performance: number;
//   };
// }

// export interface DashboardStatistics {
//   userGrowth: { date: string; count: number }[];
//   teamPerformance: { teamId: string; wins: number; losses: number; draws: number }[];
//   revenueTrend: { month: string; amount: number }[];
//   engagementMetrics: { posts: number; reactions: number; comments: number; shares: number };
//   sportDistribution: { sport: string; count: number }[];
//   roleDistribution: { role: string; count: number }[];
// }

// @Injectable()
// export class DashboardService {
//   constructor(private readonly prisma: PrismaService) {}

//   async getDashboardOverview(filters: DashboardFilters): Promise<DashboardOverview> {
//     const metrics = await this.getDashboardMetrics(filters);
//     const recentActivity = await this.getRecentActivity(filters);
//     const topPerformers = await this.getTopPerformers(filters);
//     const upcomingEvents = await this.getUpcomingEvents(filters);
//     const systemHealth = await this.getSystemHealth();

//     return {
//       metrics,
//       recentActivity,
//       topPerformers,
//       upcomingEvents,
//       systemHealth,
//     };
//   }

//   async getDashboardStatistics(filters: DashboardFilters): Promise<DashboardStatistics> {
//     const userGrowth = await this.getUserGrowth(filters);
//     const teamPerformance = await this.getTeamPerformance(filters);
//     const revenueTrend = await this.getRevenueTrend(filters);
//     const engagementMetrics = await this.getEngagementMetrics(filters);
//     const sportDistribution = await this.getSportDistribution(filters);
//     const roleDistribution = await this.getRoleDistribution(filters);

//     return {
//       userGrowth,
//       teamPerformance,
//       revenueTrend,
//       engagementMetrics,
//       sportDistribution,
//       roleDistribution,
//     };
//   }

//   async getDashboardFilters(): Promise<{
//     sports: string[];
//     roles: string[];
//     statuses: string[];
//     categories: string[];
//     teams: { id: string; name: string }[];
//     dateRanges: { label: string; value: string }[];
//     products: { id: string; name: string }[];
//     matches: { id: string; date: Date }[];
//     posts: { id: string; title: string }[];
//   }> {
//     try {
//       const [categories, teams, products, matches, posts] = await Promise.all([
//         this.prisma.category.findMany({
//           select: { id: true, name: true },
//         }),
//         this.prisma.team.findMany({
//           select: { id: true, name: true },
//         }),
//         this.prisma.product.findMany({
//           select: { id: true, name: true },
//           take: 50,
//         }),
//         this.prisma.match.findMany({
//           select: { id: true, date: true },
//           orderBy: { date: 'desc' },
//           take: 50,
//         }),
//         this.prisma.post.findMany({
//           select: { id: true, text: true },
//           orderBy: { createdAt: 'desc' },
//           take: 50,
//         }),
//       ]);

//       const dateRanges = [
//         { label: 'اليوم', value: 'today' },
//         { label: 'الأسبوع', value: 'week' },
//         { label: 'الشهر', value: 'month' },
//         { label: 'الربع', value: 'quarter' },
//         { label: 'السنة', value: 'year' },
//       ];

//       return {
//         sports: Object.values(Sport),
//         roles: Object.values(Role),
//         statuses: Object.values(UserStatus),
//         categories: categories.map(c => c.name),
//         teams: teams.map(t => ({ id: t.id, name: t.name })),
//         dateRanges,
//         products: products.map(p => ({ id: p.id, name: p.name })),
//         matches: matches.map(m => ({ id: m.id, date: m.date })),
//         posts: posts.map(p => ({ id: p.id, title: p.text?.substring(0, 50) || 'Post' })),
//       };
//     } catch (error) {
//       return {
//         sports: [],
//         roles: [],
//         statuses: [],
//         categories: [],
//         teams: [],
//         dateRanges: [],
//         products: [],
//         matches: [],
//         posts: [],
//       };
//     }
//   }

//   private async getDashboardMetrics(filters: DashboardFilters): Promise<DashboardMetrics> {
//     try {
//       const whereClause = this.buildWhereClause(filters);

//       const [
//         totalUsers,
//         totalTeams,
//         totalMatches,
//         totalPosts,
//         totalProducts,
//         totalOrders,
//         activeUsers,
//         pendingApprovals,
//       ] = await Promise.all([
//         this.prisma.user.count({ where: whereClause.user }),
//         this.prisma.team.count({ where: whereClause.team }),
//         this.prisma.match.count({ where: whereClause.match }),
//         this.prisma.post.count({ where: whereClause.post }),
//         this.prisma.product.count({ where: whereClause.product }),
//         this.prisma.order.count({ where: whereClause.order }),
//         this.prisma.user.count({ where: { ...whereClause.user, status: 'ACTIVE' as any } }),
//         this.prisma.user.count({ where: { ...whereClause.user, status: 'PENDING' as any } }),
//       ]);

//       const revenueResult = await this.prisma.order.aggregate({
//         where: { ...whereClause.order, status: 'COMPLETED' as any },
//         _sum: { totalAmount: true },
//       });

//       const totalRevenue = revenueResult._sum?.totalAmount || 0;

//       return {
//         totalUsers,
//         totalTeams,
//         totalMatches,
//         totalPosts,
//         totalProducts,
//         totalOrders,
//         totalRevenue,
//         activeUsers,
//         pendingApprovals,
//       };
//     } catch (error) {
//       return {
//         totalUsers: 0,
//         totalTeams: 0,
//         totalMatches: 0,
//         totalPosts: 0,
//         totalProducts: 0,
//         totalOrders: 0,
//         totalRevenue: 0,
//         activeUsers: 0,
//         pendingApprovals: 0,
//       };
//     }
//   }

//   private async getRecentActivity(filters: DashboardFilters): Promise<any[]> {
//     try {
//       const whereClause = this.buildWhereClause(filters);
//       const limit = filters.limit || 10;

//       const [recentUsers, recentPosts, recentMatches, recentOrders] = await Promise.all([
//         this.prisma.user.findMany({
//           where: whereClause.user,
//           orderBy: { createdAt: 'desc' },
//           take: limit,
//           select: { id: true, name: true, email: true, role: true, createdAt: true },
//         }),
//         this.prisma.post.findMany({
//           where: whereClause.post,
//           orderBy: { createdAt: 'desc' },
//           take: limit,
//           select: { id: true, text: true, createdAt: true },
//         }),
//         this.prisma.match.findMany({
//           where: whereClause.match,
//           orderBy: { date: 'desc' },
//           take: limit,
//           select: { id: true, date: true },
//         }),
//         this.prisma.order.findMany({
//           where: whereClause.order,
//           orderBy: { createdAt: 'desc' },
//           take: limit,
//           select: { id: true, totalAmount: true, createdAt: true },
//         }),
//       ]);

//       return [
//         ...recentUsers.map(u => ({ ...u, type: 'user' })),
//         ...recentPosts.map(p => ({ ...p, type: 'post' })),
//         ...recentMatches.map(m => ({ ...m, type: 'match' })),
//         ...recentOrders.map(o => ({ ...o, type: 'order' })),
//       ].slice(0, limit);
//     } catch (error) {
//       return [];
//     }
//   }

//   private async getTopPerformers(filters: DashboardFilters): Promise<any[]> {
//     try {
//       const limit = filters.limit || 5;

//       const [topUsers, topTeams, topProducts] = await Promise.all([
//         this.prisma.user.findMany({
//           orderBy: { createdAt: 'desc' },
//           take: limit,
//           select: { id: true, name: true, email: true, role: true },
//         }),
//         this.prisma.team.findMany({
//           orderBy: { id: 'desc' },
//           take: limit,
//           select: { id: true, name: true, sport: true, location: true },
//         }),
//         this.prisma.product.findMany({
//           orderBy: { createdAt: 'desc' },
//           take: limit,
//           select: { id: true, name: true, price: true },
//         }),
//       ]);

//       return [
//         ...topUsers.map(u => ({ ...u, type: 'user', score: 100 })),
//         ...topTeams.map(t => ({ ...t, type: 'team', score: 95 })),
//         ...topProducts.map(p => ({ ...p, type: 'product', score: 90 })),
//       ].slice(0, limit);
//     } catch (error) {
//       return [];
//     }
//   }

//   private async getUpcomingEvents(filters: DashboardFilters): Promise<any[]> {
//     try {
//       const limit = filters.limit || 5;

//       const upcomingMatches = await this.prisma.match.findMany({
//         where: {
//           date: { gte: new Date() },
//         },
//         orderBy: { date: 'asc' },
//         take: limit,
//         select: { id: true, date: true, location: true },
//       });

//       return upcomingMatches.map(m => ({ ...m, type: 'match' }));
//     } catch (error) {
//       return [];
//     }
//   }

//   private async getSystemHealth(): Promise<{ status: string; lastUpdate: Date; performance: number }> {
//     return {
//       status: 'healthy',
//       lastUpdate: new Date(),
//       performance: 98.5,
//     };
//   }

//   private async getUserGrowth(filters: DashboardFilters): Promise<{ date: string; count: number }[]> {
//     try {
//       const dateFrom = filters.dateFrom ? new Date(filters.dateFrom) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
//       const dateTo = filters.dateTo ? new Date(filters.dateTo) : new Date();

//       const users = await this.prisma.user.findMany({
//         where: {
//           createdAt: { gte: dateFrom, lte: dateTo },
//         },
//         select: { createdAt: true },
//       });

//       const grouped = users.reduce((acc, user) => {
//         const date = user.createdAt.toISOString().split('T')[0];
//         acc[date] = (acc[date] || 0) + 1;
//         return acc;
//       }, {} as Record<string, number>);

//       return Object.entries(grouped).map(([date, count]) => ({ date, count }));
//     } catch (error) {
//       return [];
//     }
//   }

//   private async getTeamPerformance(filters: DashboardFilters): Promise<{ teamId: string; wins: number; losses: number; draws: number }[]> {
//     try {
//       const whereClause = this.buildWhereClause(filters);
//       const limit = filters.limit || 10;

//       const teams = await this.prisma.team.findMany({
//         where: whereClause.team,
//         take: limit,
//         select: { id: true, name: true },
//       });

//       const performance = await Promise.all(
//         teams.map(async (team) => {
//           const matches = await this.prisma.match.findMany({
//             where: {
//               OR: [
//                 { teamA: team.id },
//                 { teamB: team.id },
//               ],
//             },
//           });

//           let wins = 0, losses = 0, draws = 0;

//           matches.forEach(match => {
//             if (match.teamA === team.id) {
//               wins++;
//             } else if (match.teamB === team.id) {
//               losses++;
//             }
//           });

//           return { teamId: team.id, wins, losses, draws };
//         })
//       );

//       return performance;
//     } catch (error) {
//       return [];
//     }
//   }

//   private async getRevenueTrend(filters: DashboardFilters): Promise<{ month: string; amount: number }[]> {
//     try {
//       const dateFrom = filters.dateFrom ? new Date(filters.dateFrom) : new Date(Date.now() - 12 * 30 * 24 * 60 * 60 * 1000);
//       const dateTo = filters.dateTo ? new Date(filters.dateTo) : new Date();

//       const orders = await this.prisma.order.findMany({
//         where: {
//           createdAt: { gte: dateFrom, lte: dateTo },
//         },
//         select: { totalAmount: true, createdAt: true },
//       });

//       const grouped = orders.reduce((acc, order) => {
//         const month = order.createdAt.toISOString().slice(0, 7);
//         acc[month] = (acc[month] || 0) + Number(order.totalAmount);
//         return acc;
//       }, {} as Record<string, number>);

//       return Object.entries(grouped).map(([month, amount]) => ({ month, amount }));
//     } catch (error) {
//       return [];
//     }
//   }

//   private async getEngagementMetrics(filters: DashboardFilters): Promise<{ posts: number; reactions: number; comments: number; shares: number }> {
//     try {
//       const whereClause = this.buildWhereClause(filters);

//       const [posts, reactions, comments] = await Promise.all([
//         this.prisma.post.count({ where: whereClause.post }),
//         this.prisma.reaction.count({ where: whereClause.reaction }),
//         this.prisma.comment.count({ where: whereClause.comment }),
//       ]);

//       return {
//         posts,
//         reactions,
//         comments,
//         shares: Math.floor(posts * 0.3),
//       };
//     } catch (error) {
//       return {
//         posts: 0,
//         reactions: 0,
//         comments: 0,
//         shares: 0,
//       };
//     }
//   }

//   private async getSportDistribution(filters: DashboardFilters): Promise<{ sport: string; count: number }[]> {
//     try {
//       const whereClause = this.buildWhereClause(filters);

//       const sports = await this.prisma.user.groupBy({
//         by: ['sport'],
//         where: { ...whereClause.user, sport: { not: null } },
//         _count: { sport: true },
//       });

//       return sports.map(s => ({ sport: s.sport as string, count: s._count.sport }));
//     } catch (error) {
//       return [];
//     }
//   }

//   private async getRoleDistribution(filters: DashboardFilters): Promise<{ role: string; count: number }[]> {
//     try {
//       const whereClause = this.buildWhereClause(filters);

//       const roles = await this.prisma.user.groupBy({
//         by: ['role'],
//         where: { ...whereClause.user, role: { not: null } },
//         _count: { role: true },
//       });

//       return roles.map(r => ({ role: r.role as string, count: r._count.role }));
//     } catch (error) {
//       return [];
//     }
//   }

//   private buildWhereClause(filters: DashboardFilters) {
//     const baseWhere: any = {};
    
//     if (filters.dateFrom || filters.dateTo) {
//       const dateFilter: any = {};
//       if (filters.dateFrom) dateFilter.gte = new Date(filters.dateFrom);
//       if (filters.dateTo) dateFilter.lte = new Date(filters.dateTo);
//       baseWhere['createdAt'] = dateFilter;
//     }

//     if (filters.status) {
//       baseWhere['status'] = filters.status;
//     }

//     if (filters.category) {
//       baseWhere['categoryId'] = filters.category;
//     }

//     return {
//       user: {
//         ...baseWhere,
//         ...(filters.userId && { id: filters.userId }),
//         ...(filters.sport && { sport: filters.sport as any }),
//         ...(filters.role && { role: filters.role as any }),
//       },
//       team: {
//         ...baseWhere,
//         ...(filters.teamId && { id: filters.teamId }),
//         ...(filters.sport && { sport: filters.sport as any }),
//       },
//       match: {
//         ...baseWhere,
//         ...(filters.matchId && { id: filters.matchId }),
//         ...(filters.teamId && {
//           OR: [
//             { teamA: filters.teamId },
//             { teamB: filters.teamId },
//           ],
//         }),
//       },
//       post: {
//         ...baseWhere,
//         ...(filters.userId && { userId: filters.userId }),
//       },
//       product: {
//         ...baseWhere,
//         ...(filters.category && { categoryId: filters.category }),
//       },
//       order: {
//         ...baseWhere,
//         ...(filters.userId && { userId: filters.userId }),
//       },
//       reaction: {
//         ...baseWhere,
//         ...(filters.userId && { userId: filters.userId }),
//       },
//       comment: {
//         ...baseWhere,
//         ...(filters.userId && { userId: filters.userId }),
//       },
//     };
//   }
// }
