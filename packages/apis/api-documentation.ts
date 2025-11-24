import { ContactUs, User } from '@sporton/interfaces';
import { PaginationInterface } from './serverActions';
/**
* توثيق نقاط النهاية API
* هذا الملف يحتوي على توثيق كامل لجميع نقاط النهاية API في النظام
*/
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface ApiEndpoint {
    method: HttpMethod;
    path: string;
    description: string;
    parameters?: {
        path?: Record<string, string>;
        query?: Record<string, string>;
        body?: Record<string, any>;
    };
    response?: any;
    example?: {
        request?: any;
        response?: any;
    };
}

// تعريف الكلاس الرئيسي للـ API
export class ApiClient {
    private static baseURL: string = '';

    /**
     * تكوين المعاملات للروابط
     * @param params المعاملات المراد إضافتها للرابط
     * @returns رابط مع المعاملات المضافة
     */
    private static configureParams(params?: Record<string, any>): string {
        if (!params) return '';
        return Object.entries(params)
            .filter(([_, value]) => value !== undefined && value !== null)
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join('&');
    }

    /**
     * التسجيل والدخول
     */
    static auth = {
        /**
         * التسجيل
         */
        signup: (data: User) => ({
            method: 'POST',
            path:  '/auth/register',
            description: 'التسجيل',
            parameters: {
                body: data
            }
        }),
        /**
         * الدخول
         */
        login: (data: { email: string, password: string }) => ({
            method: 'POST',
            path:  '/auth/login',
            description: 'الدخول',
            parameters: {
                body: data
            }
        }),
        logout: () => ({
            method: 'POST',
            path:  '/auth/logout',
            description: 'الخروج'
        }),
        /**
         * التحقق من التوكن
         */
        refresh_token: () => ({
            method: 'POST',
            path:  '/auth/refresh',
            description: 'التحقق من التوكن'
        }),
    }
  static user = {
    findUserById: (id: string) => ({
        method: 'GET',
        path:  '/users/me',
        description: 'الحصول على المستخدم الحالي'
    }),
    updateUser: (id: string, data: Partial<User>) => ({
        method: 'PUT',
        path:  `/users/${id}`,
        description: 'تحديث المستخدم',
        parameters: {
            path: { id },
            body: data
        }
    }),
  }
   /**
     * التسجيل والدخول
     */
 static authAdmin = {
    /**
     * التسجيل
     */
    register: (data: User) => ({
        method: 'POST',
        path:  '/auth-admin/register',
        description: 'التسجيل',
        parameters: {
            body: data
        }
    }),
    /**
     * الدخول
     */
    login: (data: { email: string, password: string }) => ({
        method: 'POST',
        path:  '/auth-admin/login',
        description: 'الدخول',
        parameters: {
            body: data
        }
    }),
    /**
     * التحقق من الحساب
     */
    activateAccount: (data: { email: string, otp: string }) => ({
        method: 'POST',
        path:  '/auth-admin/activate-account',
        description: 'التحقق من الحساب'
    }),
    /**
     * الخروج
     */
    logout: () => ({
        method: 'POST',
        path:  '/auth-admin/logout',
        description: 'الخروج'
    }),
    /**
     * التحقق من التوكن
     */
    refresh_token: () => ({
        method: 'POST',
        path:  '/auth-admin/refresh',
        description: 'التحقق من التوكن'
    }),

    /**
     * إعادة تعيين كلمة المرور
     */
    forgotPassword: (data: { email: string }) => ({
        method: 'POST',
        path:  '/auth-admin/forgot-password',
        description: 'إعادة تعيين كلمة المرور',
        parameters: {
            body: data
        }
    }),
    resetPassword: (data: { token: string, password: string }) => ({
        method: 'POST',
        path:  '/auth-admin/reset-password',
        description: 'إعادة تعيين كلمة المرور',
        parameters: {
            body: data
        }
    })

};
  static contact = {
    createContact: (data: Partial<ContactUs>) => ({
      method: 'POST',
      path:  '/contact',
      description: 'إنشاء الاتصال'
    }),
  }
  static admins = {
    getAll: () => ({
        method: 'GET',
        path:  '/admins',
        description: 'الحصول على قائمة المشرفين'
    }),
    getById: (id: string) => ({
        method: 'GET',
        path: `/admins/${id}`,
        description: 'الحصول على تفاصيل مشرف محدد',
        parameters: {
            path: { id }
        }
    }),
    create: (data: any) => ({
        method: 'POST',
        path:  '/admins',
        description: 'إنشاء مشرف جديد',
        parameters: {
            body: data
        }
    }),
    update: (id: string, data: any) => ({
        method: 'PUT',
        path: `/admins/${id}`,
        description: 'تحديث بيانات مشرف',
        parameters: {
            path: { id },
            body: data
        }
    }),
    delete: (id: string) => ({
        method: 'DELETE',
        path: `/admins/${id}`,
        description: 'حذف مشرف',
        parameters: {
            path: { id }
        }
    }),
    getAdminProfile: (id: string) => ({
        method: 'GET',
        path: `/admins/${id}/profile`,
        description: 'الحصول على تفاصيل مشرف محدد',
        parameters: {
            path: { id }
        }
    }),
    getAdminNotifications: (id: string) => ({
        method: 'GET',
        path: `/admins/${id}/notifications`,
        description: 'الحصول على قائمة الإشعارات',
        parameters: {
            path: { id }
        }
    })};
    static dashboard = {
        getOverview: (filters?: Record<string, any>): ApiEndpoint => ({
            method: 'GET',
            path: '/dashboard/overview',
            description: 'Get comprehensive dashboard overview with metrics, recent activity, and system health',
            parameters: {
                query: {
                    userId: 'User ID filter',
                    teamId: 'Team ID filter',
                    matchId: 'Match ID filter',
                    sport: 'Sport type filter',
                    role: 'User role filter',
                    dateFrom: 'Start date filter (YYYY-MM-DD)',
                    dateTo: 'End date filter (YYYY-MM-DD)',
                    status: 'Status filter',
                    category: 'Category filter',
                    limit: 'Number of items to return',
                    offset: 'Number of items to skip'
                }
            },
            response: {
                metrics: {
                    totalUsers: 'number',
                    totalTeams: 'number',
                    totalMatches: 'number',
                    totalPosts: 'number',
                    totalProducts: 'number',
                    totalOrders: 'number',
                    totalRevenue: 'number',
                    activeUsers: 'number',
                    pendingApprovals: 'number'
                },
                recentActivity: 'array',
                topPerformers: 'array',
                upcomingEvents: 'array',
                systemHealth: {
                    status: 'string',
                    lastUpdate: 'Date',
                    performance: 'number'
                }
            },
            example: {
                request: { limit: 10, sport: 'FOOTBALL' },
                response: {
                    metrics: { totalUsers: 1250, totalTeams: 85, totalMatches: 340 },
                    recentActivity: [],
                    topPerformers: [],
                    upcomingEvents: [],
                    systemHealth: { status: 'healthy', performance: 98.5 }
                }
            }
        }),

        getStatistics: (filters?: Record<string, any>): ApiEndpoint => ({
            method: 'GET',
            path: '/dashboard/statistics',
            description: 'Get detailed dashboard statistics and analytics',
            parameters: {
                query: {
                    userId: 'User ID filter',
                    teamId: 'Team ID filter',
                    matchId: 'Match ID filter',
                    sport: 'Sport type filter',
                    role: 'User role filter',
                    dateFrom: 'Start date filter (YYYY-MM-DD)',
                    dateTo: 'End date filter (YYYY-MM-DD)',
                    status: 'Status filter',
                    category: 'Category filter',
                    limit: 'Number of items to return',
                    offset: 'Number of items to skip'
                }
            },
            response: {
                userGrowth: 'array',
                teamPerformance: 'array',
                revenueTrend: 'array',
                engagementMetrics: 'object',
                sportDistribution: 'array',
                roleDistribution: 'array'
            },
            example: {
                request: { dateFrom: '2024-01-01', dateTo: '2024-12-31' },
                response: {
                    userGrowth: [{ date: '2024-01-01', count: 25 }],
                    teamPerformance: [{ teamId: 'team1', wins: 15, losses: 3, draws: 2 }],
                    revenueTrend: [{ month: '2024-01', amount: 15000 }],
                    engagementMetrics: { posts: 1250, reactions: 3500, comments: 890, shares: 375 },
                    sportDistribution: [{ sport: 'FOOTBALL', count: 45 }],
                    roleDistribution: [{ role: 'PLAYER', count: 150 }]
                }
            }
        }),

        getFilters: (): ApiEndpoint => ({
            method: 'GET',
            path: '/dashboard/filters',
            description: 'Get available filter options for dashboard',
            response: {
                sports: 'array',
                roles: 'array',
                statuses: 'array',
                categories: 'array',
                teams: 'array',
                dateRanges: 'array'
            },
            example: {
                response: {
                    sports: ['FOOTBALL', 'BASKETBALL', 'TENNIS'],
                    roles: ['PLAYER', 'COACH', 'ADMIN'],
                    statuses: ['ACTIVE', 'INACTIVE', 'PENDING'],
                    categories: ['Sports Equipment', 'Training'],
                    teams: [{ id: 'team1', name: 'Real Madrid' }],
                    dateRanges: [{ label: 'اليوم', value: 'today' }]
                }
            }
        }),

        getMetrics: (filters?: Record<string, any>): ApiEndpoint => ({
            method: 'GET',
            path: '/dashboard/metrics',
            description: 'Get dashboard metrics only',
            parameters: {
                query: {
                    userId: 'User ID filter',
                    teamId: 'Team ID filter',
                    sport: 'Sport type filter',
                    role: 'User role filter',
                    dateFrom: 'Start date filter (YYYY-MM-DD)',
                    dateTo: 'End date filter (YYYY-MM-DD)',
                    status: 'Status filter'
                }
            },
            response: {
                totalUsers: 'number',
                totalTeams: 'number',
                totalMatches: 'number',
                totalPosts: 'number',
                totalProducts: 'number',
                totalOrders: 'number',
                totalRevenue: 'number',
                activeUsers: 'number',
                pendingApprovals: 'number'
            },
            example: {
                request: { sport: 'FOOTBALL' },
                response: {
                    totalUsers: 1250,
                    totalTeams: 85,
                    totalMatches: 340,
                    totalPosts: 2800,
                    totalProducts: 150,
                    totalOrders: 890,
                    totalRevenue: 45000,
                    activeUsers: 980,
                    pendingApprovals: 25
                }
            }
        }),

        getActivity: (filters?: Record<string, any>): ApiEndpoint => ({
            method: 'GET',
            path: '/dashboard/activity',
            description: 'Get recent activity across the platform',
            parameters: {
                query: {
                    userId: 'User ID filter',
                    limit: 'Number of activities to return',
                    offset: 'Number of activities to skip'
                }
            },
            response: 'array',
            example: {
                request: { limit: 5 },
                response: [
                    { id: '1', type: 'user', name: 'أحمد محمد', createdAt: '2024-01-15T10:30:00Z' },
                    { id: '2', type: 'post', content: 'منشور جديد', createdAt: '2024-01-15T10:25:00Z' },
                    { id: '3', type: 'match', date: '2024-01-20T15:00:00Z', createdAt: '2024-01-15T10:20:00Z' }
                ]
            }
        }),

        getHealth: (): ApiEndpoint => ({
            method: 'GET',
            path: '/dashboard/health',
            description: 'Get system health status',
            response: {
                status: 'string',
                lastUpdate: 'Date',
                performance: 'number'
            },
            example: {
                response: {
                    status: 'healthy',
                    lastUpdate: '2024-01-15T10:30:00Z',
                    performance: 98.5
                }
            }
        })
    };

    static monitor = {
        getSummary: (filters?: { dateFrom?: string; dateTo?: string }): ApiEndpoint => ({
            method: 'GET',
            path: `/monitor/summary?${filters ? this.configureParams(filters) : ''}`,
            description: 'جلب الإحصائيات الأساسية للمنصة',
            parameters: {
                query: {
                    dateFrom: 'تاريخ البداية (YYYY-MM-DD)',
                    dateTo: 'تاريخ النهاية (YYYY-MM-DD)'
                }
            },
            response: {
                totalAccounts: 'number',
                activeAccounts: 'number',
                newAccountsDaily: 'number',
                totalPosts: 'number',
                newPostsDaily: 'number'
            }
        }),

        getAccountsCategories: (filters?: { dateFrom?: string; dateTo?: string }): ApiEndpoint => ({
            method: 'GET',
            path: `/monitor/accounts/categories?${filters ? this.configureParams(filters) : ''}`,
            description: 'جلب عدد الحسابات لكل فئة مستخدم',
            parameters: {
                query: {
                    dateFrom: 'تاريخ البداية (YYYY-MM-DD)',
                    dateTo: 'تاريخ النهاية (YYYY-MM-DD)'
                }
            },
            response: {
                coaches: 'number',
                players: 'number',
                fans: 'number'
            }
        }),

        getSubscriptions: (filters?: { dateFrom?: string; dateTo?: string }): ApiEndpoint => ({
            method: 'GET',
            path: `/monitor/accounts/subscriptions?${filters ? this.configureParams(filters) : ''}`,
            description: 'جلب إحصائيات الحسابات الاحترافية والاشتراكات',
            parameters: {
                query: {
                    dateFrom: 'تاريخ البداية (YYYY-MM-DD)',
                    dateTo: 'تاريخ النهاية (YYYY-MM-DD)'
                }
            },
            response: {
                proAccounts: 'number',
                regularAccounts: 'number',
                monthlySubscriptions: 'number'
            }
        }),

        getGenderChart: (filters?: { dateFrom?: string; dateTo?: string }): ApiEndpoint => ({
            method: 'GET',
            path: `/monitor/charts/gender?${filters ? this.configureParams(filters) : ''}`,
            description: 'جلب بيانات الرسم البياني الدائري لتوزيع المستخدمين حسب الجنس',
            parameters: {
                query: {
                    dateFrom: 'تاريخ البداية (YYYY-MM-DD)',
                    dateTo: 'تاريخ النهاية (YYYY-MM-DD)'
                }
            },
            response: [
                {
                    label: 'string',
                    value: 'number'
                }
            ]
        }),

        getMediaCount: (filters?: { dateFrom?: string; dateTo?: string }): ApiEndpoint => ({
            method: 'GET',
            path: `/monitor/content/media-count?${filters ? this.configureParams(filters) : ''}`,
            description: 'جلب العدد الإجمالي للفيديوهات والصور على المنصة',
            parameters: {
                query: {
                    dateFrom: 'تاريخ البداية (YYYY-MM-DD)',
                    dateTo: 'تاريخ النهاية (YYYY-MM-DD)'
                }
            },
            response: {
                totalVideos: 'number',
                totalImages: 'number'
            }
        }),

        getTopEngagement: (filters?: { dateFrom?: string; dateTo?: string; limit?: number }): ApiEndpoint => ({
            method: 'GET',
            path: `/monitor/content/top-engagement?${filters ? this.configureParams(filters) : ''}`,
            description: 'جلب قائمة بأكثر 10 أو 20 منشوراً تفاعلاً',
            parameters: {
                query: {
                    dateFrom: 'تاريخ البداية (YYYY-MM-DD)',
                    dateTo: 'تاريخ النهاية (YYYY-MM-DD)',
                    limit: 'عدد المنشورات (افتراضي: 10)'
                }
            },
            response: [
                {
                    id: 'string',
                    title: 'string',
                    engagementScore: 'number'
                }
            ]
        }),

        getSportsChart: (filters?: { dateFrom?: string; dateTo?: string }): ApiEndpoint => ({
            method: 'GET',
            path: `/monitor/charts/sports?${filters ? this.configureParams(filters) : ''}`,
            description: 'جلب بيانات الرسم البياني الدائري لتوزيع المستخدمين حسب نوع الرياضة',
            parameters: {
                query: {
                    dateFrom: 'تاريخ البداية (YYYY-MM-DD)',
                    dateTo: 'تاريخ النهاية (YYYY-MM-DD)'
                }
            },
            response: [
                {
                    sport: 'string',
                    percentage: 'number'
                }
            ]
        })
    };
}
export default ApiClient;
