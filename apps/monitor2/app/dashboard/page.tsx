'use client';

import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { DashboardCard } from '../../components/DashboardCard';
import { ChartWrapper } from '../../components/ChartWrapper';
import { useDashboard } from '../../hooks/useDashboard';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'framer-motion';
import { 
  UsersIcon, 
  TrophyIcon, 
  CalendarIcon, 
  ChartBarIcon,
  FireIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';

export default function DashboardPage() {
  const { admin, isLoading: authLoading } = useAuth();
  const { overview, metrics, isLoading: dataLoading } = useDashboard();

  if (authLoading || dataLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-main"></div>
      </div>
    );
  }

  if (!admin) {
    return null;
  }

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
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Dashboard Overview
              </h1>
              <p className="text-gray-600">
                Monitor your platform performance and key metrics
              </p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <DashboardCard
                title="Total Users"
                value={overview?.totalUsers || 0}
                subtitle="Active platform users"
                icon={<UsersIcon className="w-6 h-6 text-blue-600" />}
                trend={{ value: 12, isPositive: true }}
                delay={0.1}
              />
              
              <DashboardCard
                title="Total Teams"
                value={overview?.totalTeams || 0}
                subtitle="Registered teams"
                icon={<TrophyIcon className="w-6 h-6 text-yellow-600" />}
                trend={{ value: 8, isPositive: true }}
                delay={0.2}
              />
              
              <DashboardCard
                title="Total Matches"
                value={overview?.totalMatches || 0}
                subtitle="Scheduled matches"
                icon={<CalendarIcon className="w-6 h-6 text-green-600" />}
                trend={{ value: 15, isPositive: true }}
                delay={0.3}
              />
              
              <DashboardCard
                title="Engagement Rate"
                value={`${overview?.engagementRate || 0}%`}
                subtitle="User activity level"
                icon={<FireIcon className="w-6 h-6 text-red-600" />}
                trend={{ value: 5, isPositive: true }}
                delay={0.4}
              />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <ChartWrapper
                title="User Growth Trend"
                chartType="line"
                data={metrics?.userGrowth}
                delay={0.5}
                height={300}
              />
              
              <ChartWrapper
                title="Sport Distribution"
                chartType="doughnut"
                data={metrics?.sportDistribution}
                delay={0.6}
                height={300}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <ChartWrapper
                title="Team Performance"
                chartType="bar"
                data={metrics?.teamPerformance}
                delay={0.7}
                height={300}
              />
              
              <ChartWrapper
                title="Revenue Analytics"
                chartType="multiAxisLine"
                data={metrics?.revenueAnalytics}
                delay={0.8}
                height={300}
              />
            </div>

            {/* Additional Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-white rounded-xl p-6 border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Recent Activity
              </h2>
              <div className="space-y-4">
                {overview?.recentActivity?.slice(0, 5).map((activity: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-2 h-2 bg-primary-main rounded-full"></div>
                    <div className="flex-1">
                        <p className="text-sm text-gray-900">
                        {activity.description || 'New activity detected'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {activity.timestamp || 'Just now'}
                      </p>
                    </div>
                    <ArrowTrendingUpIcon className="w-4 h-4 text-green-500" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}
