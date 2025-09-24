// routes/orders.js
const express = require('express');
const orderController = require('../controllers/orderController');
const authProtect = require('../middlewares/authProtect');
const restrictTo = require('../middlewares/restrictTo');

const router = express.Router();

router.use(authProtect);

// Users place orders and view their own orders
router.post('/', restrictTo('user', 'admin'), orderController.createOrder);
router.get('/me', restrictTo('user', 'admin'), orderController.getMyOrders);

// Get single order (admin/owner/chef)
router.get('/:id', orderController.getOrder);

// User update actions (e.g., cancel) — restrict to owner
router.patch('/:id', restrictTo('user', 'admin'), orderController.updateOrderByUser);

// Chef updates status
router.patch('/:id/status', restrictTo('chef', 'admin'), orderController.updateOrderStatusByChef);

// Admin (or user) list
router.get('/', orderController.getAllOrders);

module.exports = router;
