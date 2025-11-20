'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, BarChart3, Users, Target, DollarSign } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  icon: React.ReactNode;
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger';
  loading?: boolean;
}

const colorClasses = {
  primary: 'bg-gradient-to-r from-primary-main to-primary-light',
  secondary: 'bg-gradient-to-r from-secondary-main to-secondary-light',
  accent: 'bg-gradient-to-r from-orange-500 to-yellow-500',
  success: 'bg-gradient-to-r from-green-500 to-emerald-500',
  warning: 'bg-gradient-to-r from-yellow-500 to-amber-500',
  danger: 'bg-gradient-to-r from-red-500 to-pink-500',
};

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  icon,
  color = 'primary',
  loading = false,
}) => {
  const cardVariants = {
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

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  if (loading) {
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
            <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
          <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</h3>
        <motion.div
          variants={pulseVariants}
          animate="pulse"
          className={`p-2 rounded-lg ${colorClasses[color]} text-white`}
        >
          {icon}
        </motion.div>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <motion.p
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="text-2xl font-bold text-gray-900 dark:text-white"
          >
            {value}
          </motion.p>
          {change && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className={`flex items-center mt-1 text-sm ${
                change.type === 'increase'
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}
            >
              {change.type === 'increase' ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1" />
              )}
              {Math.abs(change.value)}%
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// مكون لعرض مجموعة من المقاييس
interface MetricsGridProps {
  metrics: Array<Omit<MetricCardProps, 'icon'> & { iconType: string }>;
  loading?: boolean;
}

const iconMap = {
  chart: <BarChart3 className="w-5 h-5" />,
  users: <Users className="w-5 h-5" />,
  target: <Target className="w-5 h-5" />,
  dollar: <DollarSign className="w-5 h-5" />,
  trending: <TrendingUp className="w-5 h-5" />,
};

export const MetricsGrid: React.FC<MetricsGridProps> = ({ metrics, loading = false }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          {...metric}
          icon={iconMap[metric.iconType as keyof typeof iconMap] || iconMap.chart}
          loading={loading}
        />
      ))}
    </motion.div>
  );
};
