'use client';

import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { ChartWrapper } from '../../components/ChartWrapper';
import { useStatistics } from '../../hooks/useStatistics';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function StatisticsPage() {
  const { admin, isLoading: authLoading } = useAuth();
  const [filters, setFilters] = useState({
    sport: '',
    role: '',
    dateFrom: '',
    dateTo: '',
    status: ''
  });

  const { statistics, isLoading: dataLoading } = useStatistics(filters);

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
                Statistics & Analytics
              </h1>
              <p className="text-gray-600">
                Detailed insights and performance metrics
              </p>
            </div>

            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6 border border-gray-200 mb-8"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Filters
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <input
                  type="text"
                  placeholder="Sport"
                  value={filters.sport}
                  onChange={(e) => setFilters({ ...filters, sport: e.target.value })}
                  className="p-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                />
                <input
                  type="text"
                  placeholder="Role"
                  value={filters.role}
                  onChange={(e) => setFilters({ ...filters, role: e.target.value })}
                  className="p-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                />
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                  className="p-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                />
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                  className="p-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                />
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="p-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                >
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </motion.div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <ChartWrapper
                title="User Registration Trends"
                chartType="progressiveLine"
                data={statistics?.userRegistration}
                delay={0.2}
                height={350}
              />
              
              <ChartWrapper
                title="Sport Popularity"
                chartType="pie"
                data={statistics?.sportPopularity}
                delay={0.3}
                height={350}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <ChartWrapper
                title="Performance Metrics"
                chartType="radar"
                data={statistics?.performanceMetrics}
                delay={0.4}
                height={350}
              />
              
              <ChartWrapper
                title="Revenue Trends"
                chartType="combo"
                data={statistics?.revenueTrends}
                delay={0.5}
                height={350}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <ChartWrapper
                title="Geographic Distribution"
                chartType="bubble"
                data={statistics?.geographicDistribution}
                delay={0.6}
                height={350}
              />
              
              <ChartWrapper
                title="Time Series Analysis"
                chartType="progressiveLineEasing"
                data={statistics?.timeSeriesAnalysis}
                delay={0.7}
                height={350}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <ChartWrapper
                title="Category Breakdown"
                chartType="multiPie"
                data={statistics?.categoryBreakdown}
                delay={0.8}
                height={350}
              />
              
              <ChartWrapper
                title="Correlation Analysis"
                chartType="bubble"
                data={statistics?.correlationAnalysis}
                delay={0.9}
                height={350}
              />
            </div>

            {/* Summary Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Total Data Points
                </h3>
                <p className="text-3xl font-bold text-primary-main">
                  {statistics?.totalDataPoints || 0}
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Average Score
                </h3>
                <p className="text-3xl font-bold text-secondary-main">
                  {statistics?.averageScore || 0}
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Growth Rate
                </h3>
                <p className="text-3xl font-bold text-green-600">
                  {statistics?.growthRate || 0}%
                </p>
              </div>
            </motion.div>
          </motion.div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}
