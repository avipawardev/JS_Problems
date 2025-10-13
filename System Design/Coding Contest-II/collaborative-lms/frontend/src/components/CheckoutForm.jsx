import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance.js';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ course }) => {
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const transactionId = `TXN${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
      
      const response = await axiosInstance.post('/orders', {
        courseId: course._id,
        paymentMethod,
        transactionId,
        paymentDetails: {
          method: paymentMethod,
          timestamp: new Date().toISOString()
        }
      });

      alert('Payment successful! You are now enrolled in the course.');
      navigate(`/course/${course._id}`);
    } catch (error) {
      alert(error.response?.data?.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      
      <div className="mb-6 p-4 bg-gray-50 rounded">
        <h3 className="font-semibold mb-2">{course.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{course.description}</p>
        <p className="text-2xl font-bold text-blue-600">${course.price}</p>
      </div>

      <form onSubmit={handlePayment}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="razorpay">Razorpay</option>
            <option value="stripe">Stripe</option>
          </select>
        </div>

        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-sm text-yellow-800">
            <strong>Demo Mode:</strong> This is a simulated payment. No real transaction will occur.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : `Pay $${course.price}`}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
