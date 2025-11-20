'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Square, MoreHorizontal, Edit, Trash2, Copy, BarChart3 } from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  description?: string;
  status: 'active' | 'paused' | 'completed' | 'draft';
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpc: number;
  roi: number;
}

interface CampaignCardProps {
  campaign: Campaign;
  onEdit?: (campaign: Campaign) => void;
  onDelete?: (campaignId: string) => void;
  onDuplicate?: (campaign: Campaign) => void;
  onToggleStatus?: (campaignId: string, newStatus: Campaign['status']) => void;
  onViewAnalytics?: (campaignId: string) => void;
}

const statusColors = {
  active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  paused: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  completed: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  draft: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
};

const statusIcons = {
  active: <Play className="w-3 h-3" />,
  paused: <Pause className="w-3 h-3" />,
  completed: <Square className="w-3 h-3" />,
  draft: <Edit className="w-3 h-3" />,
};

export const CampaignCard: React.FC<CampaignCardProps> = ({
  campaign,
  onEdit,
  onDelete,
  onDuplicate,
  onToggleStatus,
  onViewAnalytics,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-EG', {
      style: 'currency',
      currency: 'EGP',
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('ar-EG').format(value);
  };

  const handleStatusToggle = async () => {
    if (!onToggleStatus) return;
    setIsLoading(true);
    
    const newStatus = campaign.status === 'active' ? 'paused' : 'active';
    await onToggleStatus(campaign.id, newStatus);
    
    setIsLoading(false);
  };

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
    exit: {
      opacity: 0,
      x: -100,
      transition: {
        duration: 0.3,
      },
    },
  };

  const menuVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: {
        duration: 0.15,
      },
    },
  };

  const progressPercentage = (campaign.spent / campaign.budget) * 100;

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            {campaign.name}
          </h3>
          {campaign.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {campaign.description}
            </p>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
              statusColors[campaign.status]
            }`}
          >
            {statusIcons[campaign.status]}
            {campaign.status}
          </span>
          
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <MoreHorizontal className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </button>
            
            <AnimatePresence>
              {showMenu && (
                <motion.div
                  variants={menuVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute top-8 right-0 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 py-1 min-w-[150px] z-10"
                >
                  {onEdit && (
                    <button
                      onClick={() => {
                        onEdit(campaign);
                        setShowMenu(false);
                      }}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <Edit className="w-4 h-4" />
                      تعديل
                    </button>
                  )}
                  
                  {onDuplicate && (
                    <button
                      onClick={() => {
                        onDuplicate(campaign);
                        setShowMenu(false);
                      }}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <Copy className="w-4 h-4" />
                      نسخ
                    </button>
                  )}
                  
                  {onViewAnalytics && (
                    <button
                      onClick={() => {
                        onViewAnalytics(campaign.id);
                        setShowMenu(false);
                      }}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <BarChart3 className="w-4 h-4" />
                      التحليلات
                    </button>
                  )}
                  
                  <hr className="my-1 border-gray-200 dark:border-gray-600" />
                  
                  {onDelete && (
                    <button
                      onClick={() => {
                        onDelete(campaign.id);
                        setShowMenu(false);
                      }}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="w-4 h-4" />
                      حذف
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Budget Progress */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">الميزانية</span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {formatCurrency(campaign.spent)} / {formatCurrency(campaign.budget)}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-primary-main to-primary-light h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progressPercentage, 100)}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {formatNumber(campaign.impressions)}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">مرات الظهور</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {formatNumber(campaign.clicks)}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">النقرات</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {formatPercentage(campaign.ctr)}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">معدل النقر</p>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {campaign.startDate} - {campaign.endDate}
        </div>
        
        {onToggleStatus && (campaign.status === 'active' || campaign.status === 'paused') && (
          <motion.button
            onClick={handleStatusToggle}
            disabled={isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              campaign.status === 'active'
                ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300'
                : 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? '...' : campaign.status === 'active' ? 'إيقاف' : 'تشغيل'}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};
