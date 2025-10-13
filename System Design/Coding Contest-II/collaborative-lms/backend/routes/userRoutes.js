const express = require('express');
const { getInstructors, getInstructorById, updateProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/instructors', getInstructors);
router.get('/instructors/:id', getInstructorById);
router.put('/profile', authMiddleware, updateProfile);

module.exports = router;
