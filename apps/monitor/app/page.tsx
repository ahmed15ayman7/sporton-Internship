'use client';

import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { monitorApi } from '@sporton/apis';
import { Card, Spinner } from '@sporton/ui';
import { useState, useMemo } from 'react';
import { 
  UsersIcon, 
  BoltIcon, 
  DocumentTextIcon, 
  ArrowTrendingUpIcon 
} from '@heroicons/react/24/outline';

type TimeFilter = 'day' | 'week' | 'month' | 'year';

export default function HomePage() {
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

  // جلب بيانات الملخص (B1)
  const { data: summaryData, isLoading: summaryLoading } = useQuery({
    queryKey: ['monitor-summary', dateRange],
    queryFn: () => monitorApi.getMonitorSummary(dateRange),
    enabled: !!admin,
  });

  const summary = summaryData?.data;

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50  flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!admin) {
    return null;
  }

  const statsCards = [
    {
      title: 'إجمالي الحسابات',
      value: summary?.totalAccounts || 0,
      icon: UsersIcon,
      color: 'blue',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
    },
    {
      title: 'الحسابات النشطة',
      value: summary?.activeAccounts || 0,
      icon: BoltIcon,
      color: 'green',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
    },
    {
      title: 'حسابات جديدة يومياً',
      value: summary?.newAccountsDaily || 0,
      icon: ArrowTrendingUpIcon,
      color: 'purple',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600',
    },
    {
      title: 'إجمالي المنشورات',
      value: summary?.totalPosts || 0,
      icon: DocumentTextIcon,
      color: 'orange',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-600',
    },
    {
      title: 'منشورات جديدة يومياً',
      value: summary?.newPostsDaily || 0,
      icon: DocumentTextIcon,
      color: 'pink',
      bgColor: 'bg-pink-100',
      textColor: 'text-pink-600',
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
                  الرئيسية - الإحصائيات الأساسية
                </h1>
                <p className="text-gray-600">
                  جلب الإحصائيات الأساسية للمنصة (B1)
                </p>
              </div>

              {/* Time Filter */}
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

            {/* Stats Cards */}
            {summaryLoading ? (
              <div className="flex justify-center items-center h-64">
                <Spinner size="lg" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {statsCards.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.title}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="hover:shadow-lg transition-all duration-300 border-gray-200">
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
                            className={`w-16 h-16 ${stat.bgColor} rounded-xl flex items-center justify-center`}
                          >
                            <Icon className={`w-8 h-8 ${stat.textColor}`} />
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8"
            >
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  روابط سريعة
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a
                    href="/accounts"
                    className="p-4 bg-primary-main text-white rounded-lg hover:bg-primary-dark transition-all duration-300 text-center font-medium shadow-lg hover:shadow-xl"
                  >
                    عرض بيانات الحسابات
                  </a>
                  <a
                    href="/content"
                    className="p-4 bg-primary-main text-white rounded-lg hover:bg-primary-dark transition-all duration-300 text-center font-medium shadow-lg hover:shadow-xl"
                  >
                    عرض بيانات المحتوى
                  </a>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
