// routes/dishes.js
const express = require('express');
const dishController = require('../controllers/dishController');
const authProtect = require('../middlewares/authProtect');
const restrictTo = require('../middlewares/restrictTo');

const router = express.Router();

router.get('/', dishController.getAllDishes);
router.get('/:id', dishController.getDish);

// Admin-only create/update/delete
router.use(authProtect, restrictTo('admin'));
router.post('/', dishController.createDish);
router.patch('/:id', dishController.updateDish);
router.delete('/:id', dishController.deleteDish);

module.exports = router;
