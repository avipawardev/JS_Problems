import { useState, useEffect } from 'react';
import axios from 'axios';

const ActivityLog = ({ boardId }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (boardId) {
      fetchActivities();
    }
  }, [boardId]);

  const fetchActivities = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/activity/board/${boardId}`);
      setActivities(response.data.logs);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch activities:', err);
      setLoading(false);
    }
  };

  const getActivityIcon = (action) => {
    switch (action) {
      case 'TASK_CREATED': return '✨';
      case 'TASK_MOVED': return '🔄';
      case 'TASK_UPDATED': return '📝';
      case 'TASK_DELETED': return '🗑️';
      case 'USER_ADDED': return '👋';
      case 'USER_REMOVED': return '👋';
      default: return '📋';
    }
  };

  if (loading) return <div className="loading">Loading activities...</div>;

  return (
    <div className="activity-log">
      <h3>📊 Recent Activity</h3>
      <div className="activity-list">
        {activities.length === 0 ? (
          <p className="no-activities">No activities yet</p>
        ) : (
          activities.map(activity => (
            <div key={activity.id} className="activity-item">
              <span className="activity-icon">{getActivityIcon(activity.action)}</span>
              <div className="activity-content">
                <p>{activity.description}</p>
                <span className="activity-time">
                  {new Date(activity.timestamp).toLocaleString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActivityLog;