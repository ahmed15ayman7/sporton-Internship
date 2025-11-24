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
import { UsersIcon, TrophyIcon, UserCircleIcon } from '@heroicons/react/24/outline';

type TimeFilter = 'day' | 'week' | 'month' | 'year';

export default function AccountsPage() {
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

  // جلب بيانات تصنيفات الحسابات (B2)
  const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
    queryKey: ['monitor-categories', dateRange],
    queryFn: () => monitorApi.getMonitorAccountsCategories(dateRange),
    enabled: !!admin,
  });

  // جلب بيانات الاشتراكات (B3)
  const { data: subscriptionsData, isLoading: subscriptionsLoading } = useQuery({
    queryKey: ['monitor-subscriptions', dateRange],
    queryFn: () => monitorApi.getMonitorSubscriptions(dateRange),
    enabled: !!admin,
  });

  // جلب بيانات توزيع الجنس (B4)
  const { data: genderData, isLoading: genderLoading } = useQuery({
    queryKey: ['monitor-gender', dateRange],
    queryFn: () => monitorApi.getMonitorGenderChart(dateRange),
    enabled: !!admin,
  });

  const categories = categoriesData?.data;
  const subscriptions = subscriptionsData?.data;
  const genderChart = genderData?.data;

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

  // تحضير بيانات الشارت لتصنيفات الحسابات (B2)
  const categoriesChartData = {
    labels: ['مدربين', 'لاعبين', 'جمهور'],
    datasets: [
      {
        label: 'عدد الحسابات',
        data: [
          categories?.coaches || 0,
          categories?.players || 0,
          categories?.fans || 0,
        ],
        backgroundColor: [
          'rgba(98, 58, 207, 0.8)',
          'rgba(247, 145, 28, 0.8)',
          'rgba(16, 185, 129, 0.8)',
        ],
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };

  // تحضير بيانات الشارت للاشتراكات (B3)
  const subscriptionsChartData = {
    labels: ['حسابات احترافية', 'حسابات عادية', 'اشتراكات شهرية'],
    datasets: [
      {
        label: 'عدد الحسابات',
        data: [
          subscriptions?.proAccounts || 0,
          subscriptions?.regularAccounts || 0,
          subscriptions?.monthlySubscriptions || 0,
        ],
        backgroundColor: [
          'rgba(98, 58, 207, 0.8)',
          'rgba(247, 145, 28, 0.8)',
          'rgba(59, 130, 246, 0.8)',
        ],
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };

  // تحضير بيانات الشارت لتوزيع الجنس (B4)
  const genderChartData = genderChart
    ? {
        labels: genderChart.map((item: any) => item.label),
        datasets: [
          {
            data: genderChart.map((item: any) => item.value),
            backgroundColor: [
              'rgba(59, 130, 246, 0.8)',
              'rgba(236, 72, 153, 0.8)',
              'rgba(16, 185, 129, 0.8)',
            ],
            borderWidth: 2,
            borderColor: '#ffffff',
          },
        ],
      }
    : null;

  const statsCards = [
    {
      title: 'إجمالي المدربين',
      value: categories?.coaches || 0,
      icon: UsersIcon,
      color: 'purple',
    },
    {
      title: 'إجمالي اللاعبين',
      value: categories?.players || 0,
      icon: UsersIcon,
      color: 'orange',
    },
    {
      title: 'إجمالي الجمهور',
      value: categories?.fans || 0,
      icon: UsersIcon,
      color: 'green',
    },
    {
      title: 'حسابات احترافية',
      value: subscriptions?.proAccounts || 0,
      icon: TrophyIcon,
      color: 'blue',
    },
    {
      title: 'حسابات عادية',
      value: subscriptions?.regularAccounts || 0,
      icon: UserCircleIcon,
      color: 'gray',
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
                  الحسابات - Accounts
                </h1>
                <p className="text-gray-600">
                  توزيع الحسابات والاشتراكات وتوزيع الجنس (B2, B3, B4)
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

            {/* Stats Cards */}
            {categoriesLoading || subscriptionsLoading ? (
              <div className="flex justify-center items-center h-64">
                <Spinner size="lg" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
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
                        <div className="p-6">
                          <Icon className={`w-8 h-8 text-${stat.color}-600 mb-3`} />
                          <p className="text-sm font-medium text-gray-600 mb-1">
                            {stat.title}
                          </p>
                          <p className="text-2xl font-bold text-gray-900">
                            {stat.value.toLocaleString('ar-EG')}
                          </p>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* B2: توزيع الحسابات حسب الفئة */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    B2: توزيع الحسابات حسب الفئة
                  </h3>
                  {categoriesLoading ? (
                    <div className="h-96 flex items-center justify-center">
                      <Spinner />
                    </div>
                  ) : (
                    <DynamicChart
                      chartType="pie"
                      data={categoriesChartData}
                      height={400}
                    />
                  )}
                </Card>
              </motion.div>

              {/* B3: توزيع الاشتراكات */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    B3: توزيع الاشتراكات
                  </h3>
                  {subscriptionsLoading ? (
                    <div className="h-96 flex items-center justify-center">
                      <Spinner />
                    </div>
                  ) : (
                    <DynamicChart
                      chartType="doughnut"
                      data={subscriptionsChartData}
                      height={400}
                    />
                  )}
                </Card>
              </motion.div>
            </div>

            {/* B4: توزيع المستخدمين حسب الجنس */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  B4: توزيع المستخدمين حسب الجنس
                </h3>
                {genderLoading ? (
                  <div className="h-96 flex items-center justify-center">
                    <Spinner />
                  </div>
                ) : genderChartData ? (
                  <div className="max-w-2xl mx-auto">
                    <DynamicChart
                      chartType="pie"
                      data={genderChartData}
                      height={400}
                    />
                  </div>
                ) : (
                  <div className="h-96 flex items-center justify-center text-gray-500">
                    لا توجد بيانات متاحة
                  </div>
                )}
              </Card>
            </motion.div>
          </motion.div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

