import { useState, useEffect } from 'react';
import { 
  Bell, X, Mail, Check, Trash2, ChevronLeft,
  Clock, FileText, Shield, Sparkles, User
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { store } from '@/lib/store';
import type { Notification } from '@/types';

interface NotificationCenterProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
}

const iconMap: Record<string, React.ElementType> = {
  script_update: FileText,
  announcement: Bell,
  broadcast: Sparkles,
  welcome: User,
  script_linked: Shield,
};

export function NotificationCenter({ userId, isOpen, onClose }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const loadData = () => {
    setNotifications(store.getNotifications(userId));
  };

  const handleMarkRead = (id: string) => {
    store.markNotificationRead(id);
    loadData();
  };

  const handleMarkAllRead = () => {
    store.markAllNotificationsRead(userId);
    loadData();
  };

  const handleDelete = (id: string) => {
    const allNotifications = JSON.parse(localStorage.getItem('progression_notifications') || '[]');
    const filtered = allNotifications.filter((n: Notification) => n.id !== id);
    localStorage.setItem('progression_notifications', JSON.stringify(filtered));
    loadData();
    if (selectedNotification?.id === id) {
      setSelectedNotification(null);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Notification Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-2xl z-50 glass-panel rounded-none border-r-0 flex flex-col">
        {selectedNotification ? (
          // Detail View
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center gap-4 p-4 border-b border-white/5">
              <button 
                onClick={() => setSelectedNotification(null)}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex-1">
                <h2 className="font-semibold text-white">Message</h2>
              </div>
              <div className="flex gap-1">
                <button 
                  onClick={() => handleMarkRead(selectedNotification.id)}
                  className="p-2 rounded-lg hover:bg-white/5"
                  title="Mark as read"
                >
                  <Check className="w-4 h-4 text-muted-foreground" />
                </button>
                <button 
                  onClick={() => handleDelete(selectedNotification.id)}
                  className="p-2 rounded-lg hover:bg-red-500/10"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>

            {/* Message Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-pink to-neon-purple flex items-center justify-center">
                  {(() => {
                    const Icon = iconMap[selectedNotification.type] || Mail;
                    return <Icon className="w-6 h-6 text-white" />;
                  })()}
                </div>
                <div className="flex-1">
                  <h1 className="text-xl font-bold text-white mb-1">{selectedNotification.title}</h1>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>From Progression Team</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(selectedNotification.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-white/90 whitespace-pre-wrap leading-relaxed">
                  {selectedNotification.message}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-8">
                <button 
                  onClick={() => handleMarkRead(selectedNotification.id)}
                  className="btn-primary"
                >
                  <Check className="w-4 h-4 inline mr-2" />
                  Mark as Read
                </button>
                <button 
                  onClick={() => handleDelete(selectedNotification.id)}
                  className="btn-secondary"
                >
                  <Trash2 className="w-4 h-4 inline mr-2" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ) : (
          // List View
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-pink/20 to-neon-purple/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-neon-pink" />
                </div>
                <div>
                  <h2 className="font-semibold text-white">Inbox</h2>
                  <p className="text-xs text-muted-foreground">
                    {unreadCount} unread of {notifications.length} messages
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                {unreadCount > 0 && (
                  <button 
                    onClick={handleMarkAllRead}
                    className="px-3 py-1.5 rounded-lg text-sm bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    Mark all read
                  </button>
                )}
                <button 
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-white/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Notification List */}
            <div className="flex-1 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <Mail className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">No messages yet</h3>
                  <p className="text-sm text-muted-foreground">
                    When you receive notifications, they will appear here
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-white/5">
                  {notifications.map((notification) => {
                    const Icon = iconMap[notification.type] || Mail;
                    
                    return (
                      <div
                        key={notification.id}
                        onClick={() => {
                          setSelectedNotification(notification);
                          if (!notification.read) {
                            handleMarkRead(notification.id);
                          }
                        }}
                        className={`flex items-start gap-4 p-4 hover:bg-white/5 cursor-pointer transition-colors ${
                          !notification.read ? 'bg-neon-pink/5' : ''
                        }`}
                      >
                        {/* Icon */}
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          !notification.read 
                            ? 'bg-gradient-to-br from-neon-pink to-neon-purple' 
                            : 'bg-white/10'
                        }`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className={`font-medium truncate ${!notification.read ? 'text-white' : 'text-white/70'}`}>
                              {notification.title}
                            </h3>
                            {!notification.read && (
                              <Badge className="bg-neon-pink text-white text-xs">New</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {new Date(notification.createdAt).toLocaleDateString()} • {new Date(notification.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-1">
                          {!notification.read && (
                            <div className="w-2 h-2 rounded-full bg-neon-pink" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
