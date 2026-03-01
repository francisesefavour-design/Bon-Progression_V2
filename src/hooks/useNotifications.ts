import { useState, useEffect, useCallback } from 'react';
import { store } from '@/lib/store';
import type { Notification } from '@/types';

export function useNotifications(userId?: string) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const refresh = useCallback(() => {
    if (userId) {
      const userNotifications = store.getNotifications(userId);
      setNotifications(userNotifications);
      setUnreadCount(store.getUnreadCount(userId));
    }
  }, [userId]);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 10000);
    return () => clearInterval(interval);
  }, [refresh]);

  const markAsRead = useCallback((id: string) => {
    store.markNotificationRead(id);
    refresh();
  }, [refresh]);

  const markAllAsRead = useCallback(() => {
    if (userId) {
      store.markAllNotificationsRead(userId);
      refresh();
    }
  }, [userId, refresh]);

  const sendNotification = useCallback((notification: Omit<Notification, 'id' | 'createdAt'>) => {
    store.createNotification(notification);
    if (notification.userId === userId) {
      refresh();
    }
  }, [userId, refresh]);

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    sendNotification,
    refresh,
  };
}
