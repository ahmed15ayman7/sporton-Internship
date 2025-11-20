import React from 'react';
import { Badge } from './Badge';
import { type NotificationType, type Priority } from '@sporton/interfaces';
import { Checkbox } from './Checkbox';

export interface NotificationFiltersProps {
  selectedType: NotificationType | 'ALL';
  selectedPriority: Priority | 'ALL';
  showRead: boolean;
  onTypeChange: (type: NotificationType | 'ALL') => void;
  onPriorityChange: (priority: Priority | 'ALL') => void;
  onShowReadChange: (show: boolean) => void;
  onMarkAllAsRead: () => void;
  unreadCount: number;
  className?: string;
}

const notificationTypes: { value: NotificationType | 'ALL'; label: string; color: string }[] = [
  { value: 'ALL', label: 'الكل', color: 'bg-gray-100 text-gray-800' },
  { value: 'MESSAGE', label: 'الرسائل', color: 'bg-blue-100 text-blue-800' },
  { value: 'TRANSFER_OFFER', label: 'عروض النقل', color: 'bg-green-100 text-green-800' },
  { value: 'MATCH_UPDATE', label: 'تحديثات المباريات', color: 'bg-purple-100 text-purple-800' },
  { value: 'TRAINING_SCHEDULE', label: 'جدول التدريب', color: 'bg-orange-100 text-orange-800' },
  { value: 'CONTRACT_UPDATE', label: 'تحديثات العقود', color: 'bg-indigo-100 text-indigo-800' },
  { value: 'ACHIEVEMENT', label: 'الإنجازات', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'SYSTEM', label: 'النظام', color: 'bg-gray-100 text-gray-800' }
];

const priorityLevels: { value: Priority | 'ALL'; label: string; color: string }[] = [
  { value: 'ALL', label: 'كل الأولويات', color: 'bg-gray-100 text-gray-800' },
  { value: 'URGENT', label: 'عاجل', color: 'bg-red-100 text-red-800' },
  { value: 'HIGH', label: 'عالية', color: 'bg-orange-100 text-orange-800' },
  { value: 'NORMAL', label: 'عادية', color: 'bg-blue-100 text-blue-800' },
  { value: 'LOW', label: 'منخفضة', color: 'bg-gray-100 text-gray-800' }
];

const NotificationFilters: React.FC<NotificationFiltersProps> = ({
  selectedType,
  selectedPriority,
  showRead,
  onTypeChange,
  onPriorityChange,
  onShowReadChange,
  onMarkAllAsRead,
  unreadCount,
  className = ''
}) => {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">الإشعارات</h2>
          <p className="text-sm text-gray-600">
            {unreadCount} إشعار{unreadCount !== 1 ? 'ات' : ''} غير مقروء{unreadCount !== 1 ? 'ة' : ''}
          </p>
        </div>
        
        {unreadCount > 0 && (
          <button
            onClick={onMarkAllAsRead}
            className="text-sm text-primary-main hover:text-primary-dark font-medium"
          >
            تحديد الكل كمقروء
          </button>
        )}
      </div>

      {/* Type Filters */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">نوع الإشعار</h3>
        <div className="flex flex-wrap gap-2">
          {notificationTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => onTypeChange(type.value)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                selectedType === type.value
                  ? 'ring-2 ring-primary-main ring-offset-2'
                  : 'hover:opacity-80'
              } ${type.color}`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Priority Filters */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">الأولوية</h3>
        <div className="flex flex-wrap gap-2">
          {priorityLevels.map((priority) => (
            <button
              key={priority.value}
              onClick={() => onPriorityChange(priority.value)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                selectedPriority === priority.value
                  ? 'ring-2 ring-primary-main ring-offset-2'
                  : 'hover:opacity-80'
              } ${priority.color}`}
            >
              {priority.label}
            </button>
          ))}
        </div>
      </div>

      {/* Show Read Toggle */}
      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-2 cursor-pointer">
          <Checkbox
            checked={showRead}
            onChange={(e) => onShowReadChange(e)}
            className="w-4 h-4 text-primary-main bg-gray-100 border-gray-300 rounded focus:ring-primary-main focus:ring-2"
          />
          <span className="text-sm text-gray-700">إظهار الإشعارات المقروءة</span>
        </label>
      </div>
    </div>
  );
};

export default NotificationFilters;
