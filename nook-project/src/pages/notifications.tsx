import React from 'react';
import { notificationsData } from '../data/notificationsData';
import { X } from 'lucide-react';

const Notifications: React.FC = () => {
  const groupedNotifications = notificationsData.reduce((acc, notification) => {
    (acc[notification.section] = acc[notification.section] || []).push(notification);
    return acc;
  }, {} as Record<string, typeof notificationsData>);

  return (
    <div className="bg-white min-h-screen w-full max-w-2xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <X size={24} className="text-gray-600" />
        </button>
      </div>

      {/* Notifications grouped by section */}
      {Object.entries(groupedNotifications).map(([section, items]) => (
        <div key={section} className="mb-8">
          <h3 className="text-gray-500 text-sm font-semibold uppercase mb-4 tracking-wide">
            {section}
          </h3>
          <ul className="space-y-4">
            {items.map((notification) => (
              <li 
                key={notification.id} 
                className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                {/* Avatar */}
                <img
                  src={notification.avatar}
                  alt={notification.user}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0 border-2 border-gray-200"
                />
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm leading-relaxed text-gray-900">
                    <span className="font-semibold">{notification.user}</span>{' '}
                    <span className="text-gray-600">{notification.action}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{notification.username}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Empty state (opcional) */}
      {notificationsData.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No notifications yet</p>
        </div>
      )}
    </div>
  );
};

export default Notifications;