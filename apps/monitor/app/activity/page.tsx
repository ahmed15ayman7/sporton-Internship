'use client';

import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { useActivity } from '../../hooks/useActivity';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'framer-motion';
import { useState } from 'react';

export const dynamic = 'force-dynamic';
import { 
  ClockIcon, 
  UserIcon, 
  CalendarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

export default function ActivityPage() {
  const { admin, isLoading: authLoading } = useAuth();
  const [filters, setFilters] = useState({
    limit: 20,
    offset: 0
  });

  const { activity, isLoading: dataLoading } = useActivity(filters);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-main"></div>
      </div>
    );
  }

  if (!admin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Unauthorized access</p>
        </div>
      </div>
    );
  }

  if (dataLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-main"></div>
        </div>
      </div>
    );
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />;
      default:
        return <InformationCircleIcon className="w-5 h-5 text-blue-500" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-green-200 bg-green-50 ';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'error':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-blue-200 bg-blue-50';
    }
  };

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
                Activity Timeline
              </h1>
              <p className="text-gray-600">
                Monitor real-time activities and system events
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
                Activity Filters
              </h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm text-gray-600">Show:</label>
                  <select
                    value={filters.limit}
                    onChange={(e) => setFilters({ ...filters, limit: Number(e.target.value) })}
                    className="p-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <label className="text-sm text-gray-600">Page:</label>
                  <input
                    type="number"
                    min="0"
                    value={filters.offset / filters.limit}
                    onChange={(e) => setFilters({ ...filters, offset: Number(e.target.value) * filters.limit })}
                    className="w-20 p-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                  />
                </div>
              </div>
            </motion.div>

            {/* Activity Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 border border-gray-200"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Recent Activities
              </h2>
              
              <div className="space-y-4">
                {activity?.map((item: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className={`flex items-start space-x-4 p-4 rounded-lg border-l-4 ${getActivityColor(item.type || 'info')}`}
                  >
                    <div className="flex flex-shrink-0 mt-1">
                      {getActivityIcon(item.type || 'info')}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          {item.title || 'Activity detected'}
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <ClockIcon className="w-4 h-4" />
                          <span>{item.timestamp || 'Just now'}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mt-1">
                        {item.description || 'No description available'}
                      </p>
                      
                      {item.user && (
                        <div className="flex items-center space-x-2 mt-2">
                          <UserIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-xs text-gray-500">
                            {item.user.name || 'Unknown user'}
                          </span>
                        </div>
                      )}
                      
                      {item.metadata && (
                        <div className="mt-2 p-2 bg-gray-100 rounded text-xs text-gray-600">
                          <pre className="whitespace-pre-wrap">{JSON.stringify(item.metadata, null, 2)}</pre>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                
                {(!activity || activity.length === 0) && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8 text-gray-500"
                  >
                    <CalendarIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No activities found</p>
                    <p className="text-sm">Activities will appear here as they occur</p>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Pagination */}
            {activity && activity.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-6 flex items-center justify-between"
              >
                <button
                  onClick={() => setFilters({ ...filters, offset: Math.max(0, filters.offset - filters.limit) })}
                  disabled={filters.offset === 0}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                
                <span className="text-sm text-gray-600">
                  Page {Math.floor(filters.offset / filters.limit) + 1}
                </span>
                
                <button
                  onClick={() => setFilters({ ...filters, offset: filters.offset + filters.limit })}
                  disabled={activity.length < filters.limit}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </motion.div>
            )}
          </motion.div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}
