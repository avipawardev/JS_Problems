// middlewares/authProtect.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    let token;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) token = authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ status: 'fail', message: 'Not logged in' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id).select('+password');
    if (!currentUser) return res.status(401).json({ status: 'fail', message: 'User no longer exists' });

    // Check if user changed password after token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return res.status(401).json({ status: 'fail', message: 'User recently changed password. Please login again.' });
    }

    req.user = currentUser;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ status: 'fail', message: 'Invalid token' });
  }
};
