'use client';

import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { monitorApi } from '@sporton/apis';
import { Card, Spinner, DynamicChart } from '@sporton/ui';
import { useState, useMemo } from 'react';
import { VideoCameraIcon, PhotoIcon, ArrowTrendingUpIcon, TrophyIcon } from '@heroicons/react/24/outline';

type TimeFilter = 'day' | 'week' | 'month' | 'year';

export default function ContentPage() {
  const { admin, isLoading: authLoading } = useAuth();
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('month');

  // حساب نطاق التواريخ بناءً على الفلتر
  const dateRange = useMemo(() => {
    const today = new Date();
    let dateFrom = new Date();

    switch (timeFilter) {
      case 'day':
        dateFrom.setDate(today.getDate() - 1);
        break;
      case 'week':
        dateFrom.setDate(today.getDate() - 7);
        break;
      case 'month':
        dateFrom.setMonth(today.getMonth() - 1);
        break;
      case 'year':
        dateFrom.setFullYear(today.getFullYear() - 1);
        break;
    }

    return {
      dateFrom: dateFrom.toISOString().split('T')[0],
      dateTo: today.toISOString().split('T')[0],
    };
  }, [timeFilter]);

  // جلب بيانات عدد الميديا (B5)
  const { data: mediaData, isLoading: mediaLoading } = useQuery({
    queryKey: ['monitor-media', dateRange],
    queryFn: () => monitorApi.getMonitorMediaCount(dateRange),
    enabled: !!admin,
  });

  // جلب بيانات المنشورات الأكثر تفاعلاً (B6)
  const { data: topEngagementData, isLoading: topEngagementLoading } = useQuery({
    queryKey: ['monitor-top-engagement', dateRange],
    queryFn: () => monitorApi.getMonitorTopEngagement({ ...dateRange, limit: 20 }),
    enabled: !!admin,
  });

  // جلب بيانات توزيع الرياضات (B7)
  const { data: sportsData, isLoading: sportsLoading } = useQuery({
    queryKey: ['monitor-sports', dateRange],
    queryFn: () => monitorApi.getMonitorSportsChart(dateRange),
    enabled: !!admin,
  });

  const media = mediaData?.data;
  const topEngagement = topEngagementData?.data;
  const sportsChart = sportsData?.data;

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!admin) {
    return null;
  }

  // تحضير بيانات الشارت لتوزيع الرياضات (B7)
  const sportsChartData = sportsChart
    ? {
        labels: sportsChart.map((item: any) => item.sport),
        datasets: [
          {
            label: 'النسبة المئوية',
            data: sportsChart.map((item: any) => item.percentage),
            backgroundColor: [
              'rgba(98, 58, 207, 0.8)',
              'rgba(247, 145, 28, 0.8)',
              'rgba(16, 185, 129, 0.8)',
              'rgba(239, 68, 68, 0.8)',
              'rgba(59, 130, 246, 0.8)',
              'rgba(236, 72, 153, 0.8)',
            ],
            borderWidth: 2,
            borderColor: '#ffffff',
          },
        ],
      }
    : null;

  const statsCards = [
    {
      title: 'إجمالي الفيديوهات',
      value: media?.totalVideos || 0,
      icon: VideoCameraIcon,
      color: 'purple',
    },
    {
      title: 'إجمالي الصور',
      value: media?.totalImages || 0,
      icon: PhotoIcon,
      color: 'blue',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto"
          >
            {/* Header */}
            <div className="mb-8 flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  المحتوى - Content
                </h1>
                <p className="text-gray-600">
                  إحصائيات الميديا، المنشورات الأكثر تفاعلاً، وتوزيع الرياضات (B5, B6, B7)
                </p>
              </div>

              <div className="w-48">
                <select
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value as TimeFilter)}
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-primary-main focus:border-transparent"
                >
                  <option value="day">يومي</option>
                  <option value="week">أسبوعي</option>
                  <option value="month">شهري</option>
                  <option value="year">سنوي</option>
                </select>
              </div>
            </div>

            {/* B5: Stats Cards للميديا */}
            {mediaLoading ? (
              <div className="flex justify-center items-center h-64">
                <Spinner size="lg" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {statsCards.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.title}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center justify-between p-6">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-600 mb-1">
                              {stat.title}
                            </p>
                            <p className="text-3xl font-bold text-gray-900">
                              {stat.value.toLocaleString('ar-EG')}
                            </p>
                          </div>
                          <div
                            className={`w-16 h-16 bg-${stat.color}-100 rounded-xl flex items-center justify-center`}
                          >
                            <Icon className={`w-8 h-8 text-${stat.color}-600`} />
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* B6: المنشورات الأكثر تفاعلاً */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="p-6 h-full">
                  <div className="flex items-center gap-2 mb-4">
                    <ArrowTrendingUpIcon className="w-6 h-6 text-orange-600" />
                    <h3 className="text-xl font-semibold text-gray-900">
                      B6: المنشورات الأكثر تفاعلاً (Top 20)
                    </h3>
                  </div>
                  {topEngagementLoading ? (
                    <div className="h-96 flex items-center justify-center">
                      <Spinner />
                    </div>
                  ) : topEngagement && topEngagement.length > 0 ? (
                    <div className="space-y-3 max-h-[500px] overflow-y-auto">
                      {topEngagement.map((post: any, index: number) => (
                        <motion.div
                          key={post.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0">
                              <TrophyIcon className="w-5 h-5 text-yellow-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {post.title || 'لا يوجد عنوان'}
                              </p>
                              <div className="flex items-center gap-4 mt-1">
                                <span className="text-xs text-gray-500">
                                  #{index + 1}
                                </span>
                                <span className="text-xs font-semibold text-orange-600">
                                  نقاط التفاعل: {post.engagementScore.toLocaleString('ar-EG')}
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-96 flex items-center justify-center text-gray-500">
                      لا توجد بيانات متاحة
                    </div>
                  )}
                </Card>
              </motion.div>

              {/* B7: توزيع الرياضات */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="p-6 h-full">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    B7: توزيع الرياضات
                  </h3>
                  {sportsLoading ? (
                    <div className="h-96 flex items-center justify-center">
                      <Spinner />
                    </div>
                  ) : sportsChartData ? (
                    <DynamicChart
                      chartType="pie"
                      data={sportsChartData}
                      height={450}
                    />
                  ) : (
                    <div className="h-96 flex items-center justify-center text-gray-500">
                      لا توجد بيانات متاحة
                    </div>
                  )}
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

