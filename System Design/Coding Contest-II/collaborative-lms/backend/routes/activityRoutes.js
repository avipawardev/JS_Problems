const express = require('express');
const { createActivity, getActivities } = require('../controllers/activityController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createActivity);
router.get('/', getActivities);

module.exports = router;