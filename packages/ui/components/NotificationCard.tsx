import React from 'react';
import { Avatar } from './Avatar';
import { Badge } from './Badge';
import { NotificationAction, type Notification, type NotificationType, type Priority } from '@sporton/interfaces';
import {  MessageCircle, LaughIcon, AngryIcon, HandHeartIcon, TrashIcon, HeartIcon} from 'lucide-react';
import { ChatBubbleLeftIcon, HandThumbUpIcon, } from '@heroicons/react/24/outline';

export interface NotificationCardProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
  onAction: (notification:Notification , action: NotificationAction | undefined) => void;
  className?: string;
}

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case 'MESSAGE':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      );
    case 'TRANSFER_OFFER':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
        </svg>
      );
    case 'MATCH_UPDATE':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      );
    case 'TRAINING_SCHEDULE':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'CONTRACT_UPDATE':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    case 'ACHIEVEMENT':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      );
    case 'SYSTEM':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    case 'POST':
      return (
        <MessageCircle className="w-5 h-5" />
      );
    case 'COMMENT':
      return (
        <ChatBubbleLeftIcon className="w-5 h-5" />
      );
    case 'REACTION':
      return (
        <LaughIcon className="w-5 h-5" />
      );
    default:
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h6v-2H4v2zM4 5h6v2H4V5zM4 12h6v2H4v-2z" />
        </svg>
      );
  }
};

// const getPriorityColor = (priority: Priority) => {
//   switch (priority) {
//     case 'URGENT':
//       return 'bg-red-100 text-red-800 border-red-200';
//     case 'HIGH':
//       return 'bg-orange-100 text-orange-800 border-orange-200';
//     case 'NORMAL':
//       return 'bg-blue-100 text-blue-800 border-blue-200';
//     case 'LOW':
//       return 'bg-gray-100 text-gray-800 border-gray-200';
//     default:
//       return 'bg-gray-100 text-gray-800 border-gray-200';
//   }
// };

const getTypeColor = (type: NotificationType) => {
  switch (type) {
    case 'MESSAGE':
      return 'text-blue-600';
    case 'TRANSFER_OFFER':
      return 'text-green-600';
    case 'MATCH_UPDATE':
      return 'text-purple-600';
    case 'TRAINING_SCHEDULE':
      return 'text-orange-600';
    case 'CONTRACT_UPDATE':
      return 'text-indigo-600';
    case 'ACHIEVEMENT':
      return 'text-yellow-600';
    case 'SYSTEM':
      return 'text-gray-600';
    default:
      return 'text-gray-600';
  }
};

const formatTimeAgo = (date: Date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);

  if (diffInSeconds < 60) return 'الآن';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} دقيقة`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} ساعة`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} يوم`;
  return `${Math.floor(diffInSeconds / 2592000)} شهر`;
};

const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onMarkAsRead,
  onDelete,
  onAction,
  className = ''
}) => {
  return (
    <div className={` rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all duration-200 cursor-pointer ${className} ${!notification.isRead ? 'border-l-4 border-primary-main bg-primary-light/20 ' : 'bg-white'}`} onClick={(e) => {
      e.stopPropagation();
      onAction(notification, notification.action)
      onMarkAsRead(notification.id)
    }}>
      <div className="flex items-start space-x-3">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <Avatar
            src={notification.sender?.image||''}
            alt={notification.sender?.name || 'S'}
            fallback={notification.sender?.name?.charAt(0) || 'S'}
            size="md"
            isblur={notification.type==="VIEW_PROFILE"}
            className="bg-gray-100"
          />
            {!notification.sender?.image && (
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getTypeColor(notification.type || 'SYSTEM')}`}>
                {getNotificationIcon(notification.type || 'SYSTEM')}
              </div>
            )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {/* Header */}
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-sm font-semibold text-gray-900 truncate">
                  {notification.type==="VIEW_PROFILE"?<span className="text-sm text-gray-500">{notification.sender?.name.slice(0,2)}...</span>:notification.sender?.name || ''}
                </h3>
                {/* <Badge variant="outline" className={`text-xs ${getPriorityColor(notification.priority || 'NORMAL')}`}>
                  {notification.priority || 'NORMAL'}
                </Badge> */}
              </div>

              {/* Title */}
              <h4 className="text-sm font-medium text-gray-900 mb-1">
                {notification.title}
              </h4>

              {/* Content */}
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                {notification.type==="REACTION"?<span className="text-sm text-gray-500">{notification.content==="LIKE"?<HandThumbUpIcon className="w-4 h-4 text-blue-500" /> : notification.content==="LOVE"?<HeartIcon className="w-4 h-4 text-red-500" /> : notification.content==="HAHA"?<LaughIcon className="w-4 h-4 text-yellow-500" /> : notification.content==="ANGRY"?<AngryIcon className="w-4 h-4 text-red-500" /> : notification.content==="CLAP"?<HandHeartIcon className="w-4 h-4 text-green-500" /> : <></>}</span>:notification.content}
              </p>

              {/* Time */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {formatTimeAgo(notification.createdAt)}
                </span>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  {/* {!notification.isRead && (
                    <button
                      onClick={() => onMarkAsRead(notification.id)}
                      className="text-xs text-primary-main hover:text-primary-dark font-medium"
                    >
                      تحديد كمقروء
                    </button>
                  )} */}
                  
                  {/* {notification.action && (
                    <button
                      onClick={() => onAction(notification.id, notification.action)}
                      className="text-xs bg-primary-main text-white px-2 py-1 rounded hover:bg-primary-dark transition-colors"
                    >
                      {notification.action.buttonText || 'عرض'}
                    </button>
                  )} */}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(notification.id);
                    }}
                    className="text-xs text-red-600 hover:text-red-800 cursor-pointer"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
