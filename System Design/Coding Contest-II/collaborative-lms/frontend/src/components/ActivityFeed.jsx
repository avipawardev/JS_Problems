import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance.js';
import useSocket from '../hooks/useSocket.js';

const ActivityFeed = () => {
  const [activities, setActivities] = useState([]);
  const { socket, activities: realtimeActivities } = useSocket();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axiosInstance.get('/activities');
        setActivities(response.data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };
    fetchActivities();
  }, []);

  useEffect(() => {
    if (realtimeActivities.length > 0) {
      setActivities(prev => [...realtimeActivities, ...prev].slice(0, 20));
    }
  }, [realtimeActivities]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity._id} className="border-b pb-2">
            <p className="text-sm text-gray-600">
              <span className="font-medium">{activity.user.name}</span> {activity.description}
            </p>
            <p className="text-xs text-gray-400">
              {new Date(activity.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;