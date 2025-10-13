const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  amount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  paymentMethod: { type: String, enum: ['razorpay', 'stripe', 'free'], default: 'razorpay' },
  transactionId: { type: String },
  paymentDetails: { type: Object }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
