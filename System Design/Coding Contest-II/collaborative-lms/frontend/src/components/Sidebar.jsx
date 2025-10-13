import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <div className="space-y-4">
        <Link to={user?.role === 'instructor' ? '/instructor' : '/student'} 
              className="block py-2 px-4 rounded hover:bg-gray-700">
          Dashboard
        </Link>
        {user?.role === 'instructor' && (
          <Link to="/courses/create" className="block py-2 px-4 rounded hover:bg-gray-700">
            Create Course
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;