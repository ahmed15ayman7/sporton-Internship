'use client';

import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { useHealth } from '../../hooks/useHealth';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'framer-motion';
import { 
  CheckCircleIcon, 
  ExclamationTriangleIcon, 
  XCircleIcon,
  ClockIcon,
  ServerIcon,
  ServerStackIcon,
  GlobeAltIcon,
  CpuChipIcon
} from '@heroicons/react/24/outline';

export default function HealthPage() {
  const { admin, isLoading: authLoading } = useAuth();
  const { health, isLoading: dataLoading } = useHealth();

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

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'healthy':
      case 'online':
      case 'up':
        return <CheckCircleIcon className="w-6 h-6 text-green-500" />;
      case 'warning':
      case 'degraded':
        return <ExclamationTriangleIcon className="w-6 h-6 text-yellow-500" />;
      case 'error':
      case 'down':
      case 'offline':
        return <XCircleIcon className="w-6 h-6 text-red-500" />;
      default:
        return <ClockIcon className="w-6 h-6 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'healthy':
      case 'online':
      case 'up':
          return 'border-green-200 bg-green-50';
      case 'warning':
      case 'degraded':
        return 'border-yellow-200 bg-yellow-50';
      case 'error':
      case 'down':
      case 'offline':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getStatusText = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'healthy':
      case 'online':
      case 'up':
        return 'text-green-700';
      case 'warning':
      case 'degraded':
        return 'text-yellow-700';
      case 'error':
      case 'down':
      case 'offline':
        return 'text-red-700';
      default:
        return 'text-gray-700';
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
                System Health
              </h1>
              <p className="text-gray-600">
                Monitor system status and performance metrics
              </p>
            </div>

            {/* Overall Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6 border border-gray-200 mb-8"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Overall System Status
                </h2>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(health?.overallStatus || 'unknown')}
                  <span className={`font-semibold ${getStatusText(health?.overallStatus || 'unknown')}`}>
                    {health?.overallStatus || 'Unknown'}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">
                    {health?.uptime || '0'}%
                  </p>
                    <p className="text-sm text-gray-600">Uptime</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">
                    {health?.responseTime || '0'}ms
                  </p>
                  <p className="text-sm text-gray-600">Response Time</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">
                    {health?.lastCheck || 'Unknown'}
                  </p>
                  <p className="text-sm text-gray-600">Last Check</p>
                </div>
              </div>
            </motion.div>

            {/* Service Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 border border-gray-200 mb-8"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Service Status
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {health?.services?.map((service: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className={`p-4 rounded-lg border-l-4 ${getStatusColor(service.status)}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <ServerIcon className="w-5 h-5 text-gray-600" />
                        <span className="font-medium text-gray-900">
                          {service.name || 'Unknown Service'}
                        </span>
                      </div>
                      {getStatusIcon(service.status)}
                    </div>
                    
                      <p className="text-sm text-gray-600 mb-2">
                      {service.description || 'No description available'}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Response: {service.responseTime || 'N/A'}ms</span>
                      <span>{service.lastCheck || 'Unknown'}</span>
                    </div>
                  </motion.div>
                ))}
                
                {(!health?.services || health.services.length === 0) && (
                  <div className="col-span-full text-center py-8 text-gray-500">
                    <ServerIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No service information available</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Performance Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl p-6 border border-gray-200 mb-8"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Performance Metrics
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <CpuChipIcon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-lg font-semibold text-blue-900">
                    {health?.cpuUsage || '0'}%
                  </p>
                  <p className="text-sm text-blue-700">CPU Usage</p>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <ServerStackIcon className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-lg font-semibold text-green-900">
                    {health?.memoryUsage || '0'}%
                  </p>
                  <p className="text-sm text-green-700">Memory Usage</p>
                </div>
                
                <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <ServerIcon className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <p className="text-lg font-semibold text-yellow-900">
                    {health?.diskUsage || '0'}%
                  </p>
                  <p className="text-sm text-yellow-700">Disk Usage</p>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <GlobeAltIcon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-lg font-semibold text-purple-900">
                    {health?.networkLatency || '0'}ms
                  </p>
                  <p className="text-sm text-purple-700">Network Latency</p>
                </div>
              </div>
            </motion.div>

            {/* Error Logs */}
            {health?.errors && health.errors.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-xl p-6 border border-gray-200"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Recent Errors
                </h2>
                
                <div className="space-y-3">
                  {health.errors.slice(0, 5).map((error: any, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="p-3 bg-red-50 rounded-lg border border-red-200"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-red-900">
                          {error.message || 'Unknown error'}
                        </span>
                        <span className="text-xs text-red-700">
                          {error.timestamp || 'Unknown time'}
                        </span>
                      </div>
                      {error.details && (
                        <p className="text-xs text-red-700 mt-1">
                          {error.details}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}
