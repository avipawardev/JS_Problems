import React, { useState } from 'react';
import useSocket from '../hooks/useSocket.js';

const NotificationBell = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const { activities } = useSocket();

  return (
    <div className="relative">
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 text-gray-700 hover:text-purple-600"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {activities.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {activities.length}
          </span>
        )}
      </button>

      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border z-50">
          <div className="p-4 border-b">
            <h3 className="font-bold">Notifications</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {activities.length === 0 ? (
              <p className="p-4 text-gray-500 text-center">No new notifications</p>
            ) : (
              activities.map((activity, idx) => (
                <div key={idx} className="p-4 border-b hover:bg-gray-50">
                  <p className="text-sm">{activity.description || activity.type}</p>
                  <p className="text-xs text-gray-500 mt-1">Just now</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
