// middlewares/authProtect.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) return res.status(401).json({ status: 'fail', message: 'Not logged in' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) return res.status(401).json({ status: 'fail', message: 'User no longer exists' });

    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return res.status(401).json({ status: 'fail', message: 'Password recently changed. Please login again.' });
    }

    req.user = currentUser;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ status: 'fail', message: 'Invalid token' });
  }
};
