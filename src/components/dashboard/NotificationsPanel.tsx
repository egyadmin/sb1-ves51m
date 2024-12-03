import React from 'react';
import { Bell, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface Notification {
  id: string;
  type: 'warning' | 'success' | 'info';
  message: string;
  time: string;
}

interface NotificationsPanelProps {
  notifications: Notification[];
}

export default function NotificationsPanel({ notifications }: NotificationsPanelProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Clock className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <Bell className="h-5 w-5 text-gray-500 ml-2" />
          <h3 className="text-lg font-medium text-gray-900">الإشعارات</h3>
        </div>
      </div>
      <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <div key={notification.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {getIcon(notification.type)}
              </div>
              <div className="mr-3 flex-1">
                <p className="text-sm text-gray-900">{notification.message}</p>
                <p className="mt-1 text-xs text-gray-500">{notification.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}