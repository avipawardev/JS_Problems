const express = require('express');
const Router = express.Router();
const limiter = require('../middlewares/rateLimiter');
const { publicController, limitedController } = require('../controllers/apiController');

Router.get('/public',publicController)

Router.get('/limited',limiter,limitedController)

module.exports = Router;