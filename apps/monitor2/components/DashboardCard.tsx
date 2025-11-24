'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  delay?: number;
}

export const DashboardCard = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend, 
  className = '',
  delay = 0 
}: DashboardCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
      className={`bg-white rounded-xl p-6 border border-gray-200 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">
            {title}
          </p>
          <div className="flex items-baseline space-x-2">
            <p className="text-3xl font-bold text-gray-900">
              {value}
            </p>
            {trend && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: delay + 0.2 }}
                className={`text-sm font-medium ${
                  trend.isPositive 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}
              >
                {trend.isPositive ? '+' : ''}{trend.value}%
              </motion.span>
            )}
          </div>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + 0.3 }}
              className="text-sm text-gray-500 mt-1"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
        {icon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + 0.1 }}
            className="w-12 h-12 bg-gradient-to-br from-primary-main/10 to-secondary-main/10 rounded-lg flex items-center justify-center"
          >
            {icon}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
