// controllers/orderController.js
const Order = require('../models/Order');
const Dish = require('../models/Dish');
const User = require('../models/User');

async function assignRandomChef() {
  // get all chefs and choose a random one
  const chefs = await User.find({ role: 'chef' });
  if (!chefs || chefs.length === 0) return null;
  const idx = Math.floor(Math.random() * chefs.length);
  return chefs[idx];
}

exports.createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { items } = req.body; // items: [{ dishId, quantity }]
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ status: 'fail', message: 'Provide order items' });
    }

    // build dishes array and compute total price
    let total = 0;
    const dishes = [];
    for (const it of items) {
      const dish = await Dish.findById(it.dishId);
      if (!dish) return res.status(404).json({ status: 'fail', message: `Dish ${it.dishId} not found` });
      const qty = Math.max(1, parseInt(it.quantity || 1, 10));
      dishes.push({ dish: dish._id, quantity: qty });
      total += dish.price * qty;
    }

    const chef = await assignRandomChef();

    const newOrder = await Order.create({
      user: userId,
      dishes,
      totalPrice: total,
      status: 'Order Received',
      chef: chef ? chef._id : undefined,
      assignedAt: chef ? Date.now() : undefined
    });

    const populated = await Order.findById(newOrder._id).populate('chef', 'name email role').populate('user', 'name email');

    res.status(201).json({ status: 'success', data: { order: populated } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('dishes.dish').populate('chef', 'name email');
    res.status(200).json({ status: 'success', results: orders.length, data: { orders } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('dishes.dish').populate('chef', 'name email').populate('user', 'name email');
    if (!order) return res.status(404).json({ status: 'fail', message: 'Order not found' });

    // allow admin, owner, or chef to view
    if (req.user.role !== 'admin' && String(order.user._id) !== String(req.user._id) && String(order.chef?._id) !== String(req.user._id)) {
      return res.status(403).json({ status: 'fail', message: 'Not authorized to view this order' });
    }

    res.status(200).json({ status: 'success', data: { order } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};

exports.updateOrderByUser = async (req, res) => {
  try {
    // allow user to cancel or update only before chef starts preparing
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ status: 'fail', message: 'Order not found' });

    if (String(order.user) !== String(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ status: 'fail', message: 'Not authorized' });
    }

    // simple status change not allowed here - user can cancel only if not Preparing
    if (req.body.action === 'cancel') {
      if (order.status !== 'Order Received') {
        return res.status(400).json({ status: 'fail', message: 'Cannot cancel after order started preparing' });
      }
      order.status = 'Delivered'; // or set to 'Cancelled' if you want; using Delivered is placeholder — change as needed
      await order.save();
      return res.status(200).json({ status: 'success', data: { order } });
    }

    // otherwise disallow changes to core fields in this endpoint
    return res.status(400).json({ status: 'fail', message: 'No supported update action' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};

// Chef updates the status
exports.updateOrderStatusByChef = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ status: 'fail', message: 'Order not found' });

    if (String(order.chef) !== String(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ status: 'fail', message: 'Not authorized to update this order' });
    }

    const { status } = req.body;
    const allowed = ['Preparing', 'Out for Delivery', 'Delivered'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ status: 'fail', message: 'Invalid status' });
    }

    order.status = status;
    await order.save();
    const populated = await Order.findById(order._id).populate('chef', 'name email').populate('user', 'name email').populate('dishes.dish');

    res.status(200).json({ status: 'success', data: { order: populated } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};

// Admin or user can list orders
exports.getAllOrders = async (req, res) => {
  try {
    let filter = {};
    if (req.user.role === 'user') filter.user = req.user._id;
    // admin sees all
    const orders = await Order.find(filter).populate('dishes.dish').populate('chef', 'name email').populate('user', 'name email');
    res.status(200).json({ status: 'success', results: orders.length, data: { orders } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};
