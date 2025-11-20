import React, { useRef, useCallback } from 'react';
import  NotificationCard  from './NotificationCard';
import { Spinner } from './Spinner';
import { NotificationAction, type Notification } from '@sporton/interfaces';

export interface NotificationListProps {
  notifications: Notification[];
  isLoading: boolean;
  hasNextPage: boolean;
  useTranslations: any;
  isFetchingNextPage: boolean;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
  onAction: (notification:Notification , action: NotificationAction | undefined) => void;
  onLoadMore: () => void;
  className?: string;
}

const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  isLoading,
  hasNextPage,
  useTranslations,
  isFetchingNextPage,
  onMarkAsRead,
  onDelete,
  onAction,
  onLoadMore,
  className = ''
}) => {
  const t = useTranslations("");
  const observer = useRef<IntersectionObserver>(null);
  const lastNotificationRef = useCallback((node: HTMLDivElement) => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        onLoadMore();
      }
    });
    if (node) observer.current.observe(node);
  }, [isLoading, hasNextPage, isFetchingNextPage, onLoadMore]);

  if (isLoading && notifications.length === 0) {
    return (
      <div className={`flex items-center justify-center py-12 ${className}`}>
        <div className="text-center">
          <Spinner size="lg" className="mx-auto mb-4" />
          <p className="text-gray-500">{t("notifications.loading")}</p>
        </div>
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className={`flex items-center justify-center py-12 ${className}`}>
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h6v-2H4v2zM4 5h6v2H4V5zM4 12h6v2H4v-2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">{t("notifications.noNotifications")}</h3>
          <p className="text-gray-500">{t("notifications.noNotificationsDescription")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {notifications.map((notification, index) => {
        const isLast = index === notifications.length - 1;
        
        return (
          <div
            key={notification.id}
            ref={isLast ? lastNotificationRef : undefined}
          >
            <NotificationCard
              notification={notification}
              onMarkAsRead={onMarkAsRead}
              onDelete={onDelete}
              onAction={onAction}
            />
          </div>
        );
      })}

      {/* Loading More Indicator */}
      {isFetchingNextPage && (
        <div className="flex items-center justify-center py-4">
          <div className="flex items-center space-x-2">
            <Spinner size="sm" />
            <span className="text-sm text-gray-500">{t("notifications.loadingMore")}</span>
          </div>
        </div>
      )}

      {/* End of List */}
      {!hasNextPage && notifications.length > 0 && (
        <div className="text-center py-4">
          <p className="text-sm text-gray-500">{t("notifications.allNotifications")}</p>
        </div>
      )}
    </div>
  );
};

export default NotificationList;
