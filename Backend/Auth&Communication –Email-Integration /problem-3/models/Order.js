// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dishes: [{
    dish: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish', required: true },
    quantity: { type: Number, default: 1, min: 1 }
  }],
  totalPrice: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['Order Received', 'Preparing', 'Out for Delivery', 'Delivered'],
    default: 'Order Received'
  },
  chef: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // assigned chef
  assignedAt: Date
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
