import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import useAuth from '../hooks/useAuth.js';
import axiosInstance from '../api/axiosInstance.js';

const Profile = () => {
  const { user, login } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    avatar: user?.avatar || ''
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get('/orders/my-orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
    if (user) {
      setFormData({
        name: user.name || '',
        bio: user.bio || '',
        avatar: user.avatar || ''
      });
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put('/users/profile', formData);
      const token = localStorage.getItem('token');
      login(token, { ...user, ...response.data });
      setEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Profile</h1>
          
          {/* Profile Info */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            {!editing ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full" />
                    ) : (
                      <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                        {user?.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="ml-4">
                      <h2 className="text-2xl font-bold">{user?.name}</h2>
                      <p className="text-gray-600">{user?.email}</p>
                      {user?.bio && <p className="text-sm text-gray-500 mt-1">{user.bio}</p>}
                      <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {user?.role}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setEditing(true)}
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                  >
                    Edit Profile
                  </button>
                </div>
              </>
            ) : (
              <form onSubmit={handleUpdateProfile}>
                <h3 className="text-xl font-bold mb-4">Edit Profile</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Bio</label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({...formData, bio: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg"
                      rows="3"
                      placeholder="Tell us about yourself"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Avatar URL</label>
                    <input
                      type="url"
                      value={formData.avatar}
                      onChange={(e) => setFormData({...formData, avatar: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="https://example.com/avatar.jpg"
                    />
                    {formData.avatar && (
                      <img src={formData.avatar} alt="Preview" className="mt-2 w-20 h-20 rounded-full" />
                    )}
                  </div>
                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      className="flex-1 bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditing(false)}
                      className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Purchase History */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Purchase History</h2>
            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : orders.length === 0 ? (
              <p className="text-gray-600 text-center py-8">No purchases yet</p>
            ) : (
              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order._id} className="border rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center">
                      {order.course.thumbnail && (
                        <img 
                          src={order.course.thumbnail} 
                          alt={order.course.title}
                          className="w-20 h-20 object-cover rounded"
                        />
                      )}
                      <div className="ml-4">
                        <h3 className="font-semibold">{order.course.title}</h3>
                        <p className="text-sm text-gray-600">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                        <span className={`inline-block mt-1 px-2 py-1 rounded text-xs ${
                          order.paymentStatus === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.paymentStatus}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold">${order.amount}</p>
                      <p className="text-sm text-gray-600">{order.paymentMethod}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
