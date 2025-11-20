'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DynamicChart, ChartType } from '../DynamicChart';

interface AnalyticsDashboardProps {
  data?: {
    overview: {
      totalCampaigns: number;
      activeCampaigns: number;
      totalSpent: number;
      totalImpressions: number;
      totalClicks: number;
      averageCTR: number;
      totalConversions: number;
      averageROI: number;
    };
    performanceData: {
      labels: string[];
      datasets: Array<{
        label: string;
        data: number[];
        borderColor?: string;
        backgroundColor?: string;
      }>;
    };
    audienceData: {
      demographics: Array<{
        label: string;
        value: number;
        color: string;
      }>;
      interests: Array<{
        label: string;
        value: number;
      }>;
      devices: Array<{
        label: string;
        value: number;
        color: string;
      }>;
    };
    recentCampaigns: Array<{
      id: string;
      name: string;
      status: 'active' | 'paused' | 'completed';
      impressions: number;
      clicks: number;
      ctr: number;
      spent: number;
      conversions: number;
    }>;
  };
  loading?: boolean;
  timePeriod?: 'day' | 'week' | 'month' | 'year';
  onTimePeriodChange?: (period: 'day' | 'week' | 'month' | 'year') => void;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  data,
  loading = false,
  timePeriod = 'month',
  onTimePeriodChange,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-EG', {
      style: 'currency',
      currency: 'EGP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('ar-EG').format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Loading skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="animate-pulse">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-4"></div>
                <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="animate-pulse">
                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-4"></div>
                <div className="h-64 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            لا توجد بيانات متاحة
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            قم بإنشاء حملتك الأولى لبدء مشاهدة التحليلات
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Time Period Selector */}
      {onTimePeriodChange && (
        <motion.div variants={itemVariants} className="flex justify-end">
          <div className="inline-flex rounded-lg bg-gray-100 dark:bg-gray-700 p-1">
            {['day', 'week', 'month', 'year'].map((period) => (
              <button
                key={period}
                onClick={() => onTimePeriodChange(period as any)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  timePeriod === period
                    ? 'bg-white dark:bg-gray-600 text-primary-main dark:text-primary-light shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {period === 'day' && 'يوم'}
                {period === 'week' && 'أسبوع'}
                {period === 'month' && 'شهر'}
                {period === 'year' && 'سنة'}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Overview Metrics */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                إجمالي الحملات
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {data.overview.totalCampaigns}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400">
                {data.overview.activeCampaigns} نشطة
              </p>
            </div>
            <div className="p-3 bg-primary-main rounded-lg">
              <div className="w-6 h-6 text-white">📊</div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                المبلغ المُنفق
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(data.overview.totalSpent)}
              </p>
            </div>
            <div className="p-3 bg-secondary-main rounded-lg">
              <div className="w-6 h-6 text-white">💰</div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                مرات الظهور
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatNumber(data.overview.totalImpressions)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {formatNumber(data.overview.totalClicks)} نقرة
              </p>
            </div>
            <div className="p-3 bg-orange-500 rounded-lg">
              <div className="w-6 h-6 text-white">👁️</div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                معدل النقر
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatPercentage(data.overview.averageCTR)}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400">
                {data.overview.totalConversions} تحويل
              </p>
            </div>
            <div className="p-3 bg-green-500 rounded-lg">
              <div className="w-6 h-6 text-white">🎯</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            أداء الحملات
          </h3>
          <DynamicChart
            chartType="multiAxisLine"
            data={data.performanceData}
            height={300}
          />
        </motion.div>

        {/* Audience Demographics */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            التركيبة السكانية
          </h3>
          <DynamicChart
            chartType="doughnut"
            data={{
              labels: data.audienceData.demographics.map((item) => item.label),
              datasets: [
                {
                  data: data.audienceData.demographics.map((item) => item.value),
                  backgroundColor: data.audienceData.demographics.map((item) => item.color),
                },
              ],
            }}
            height={300}
          />
        </motion.div>

        {/* Device Breakdown */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            الأجهزة
          </h3>
          <DynamicChart
            chartType="pie"
            data={{
              labels: data.audienceData.devices.map((item) => item.label),
              datasets: [
                {
                  data: data.audienceData.devices.map((item) => item.value),
                  backgroundColor: data.audienceData.devices.map((item) => item.color),
                },
              ],
            }}
            height={300}
          />
        </motion.div>

        {/* Top Interests */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            أهم الاهتمامات
          </h3>
          <DynamicChart
            chartType="bar"
            data={{
              labels: data.audienceData.interests.map((item) => item.label),
              datasets: [
                {
                  label: 'الاهتمامات',
                  data: data.audienceData.interests.map((item) => item.value),
                  backgroundColor: 'rgba(59, 130, 246, 0.8)',
                  borderColor: 'rgb(59, 130, 246)',
                  borderWidth: 1,
                },
              ],
            }}
            height={300}
          />
        </motion.div>
      </div>

      {/* Recent Campaigns Table */}
      <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            الحملات الأخيرة
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  اسم الحملة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  الحالة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  مرات الظهور
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  النقرات
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  معدل النقر
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  المُنفق
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  التحويلات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {data.recentCampaigns.map((campaign, index) => (
                <motion.tr
                  key={campaign.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {campaign.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        campaign.status === 'active'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : campaign.status === 'paused'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                      }`}
                    >
                      {campaign.status === 'active' && 'نشط'}
                      {campaign.status === 'paused' && 'متوقف'}
                      {campaign.status === 'completed' && 'مكتمل'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {formatNumber(campaign.impressions)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {formatNumber(campaign.clicks)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {formatPercentage(campaign.ctr)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {formatCurrency(campaign.spent)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {campaign.conversions}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};
