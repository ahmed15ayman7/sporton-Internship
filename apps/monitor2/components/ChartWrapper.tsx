'use client';

import { motion } from 'framer-motion';
import { DynamicChart, ChartType } from '@sporton/ui';
import { useState } from 'react';

interface ChartWrapperProps {
  title: string;
  chartType: ChartType;
  data?: any;
  className?: string;
  delay?: number;
  height?: number;
}

export const ChartWrapper = ({ 
  title, 
  chartType, 
  data, 
  className = '',
  delay = 0,
  height = 400 
}: ChartWrapperProps) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ 
        scale: 1.01,
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
      }}
      className={`bg-white rounded-xl p-6 border border-gray-200 ${className}`}
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        <div className="w-full bg-gray-200 rounded-full h-1">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1, delay: delay + 0.3 }}
            className="bg-gradient-to-r from-primary-main to-secondary-main h-1 rounded-full"
          />
        </div>
      </div>
      
      <div className="relative">
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg z-10"
          >
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-main"></div>
          </motion.div>
        )}
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: delay + 0.4 }}
        >
          <DynamicChart
            chartType={chartType}
            data={data}
            height={height}
            className="w-full"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};
