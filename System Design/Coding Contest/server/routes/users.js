const express = require('express');
const { getAllUsers } = require('../controllers/userController');
const { authenticateToken, requireAdmin } = require('../middlewares/auth');

const router = express.Router();

router.get('/', authenticateToken, requireAdmin, getAllUsers);

module.exports = router;