// controllers/authController.js
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const rateLimit = require('express-rate-limit');
const User = require('../models/User');
const { sendEmail } = require('../utils/email');

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1d' });

const createSendToken = (user, res) => {
  const token = signToken(user._id);
  user.password = undefined;
  res.status(200).json({ status: 'success', token, data: { user } });
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) return res.status(400).json({ status: 'fail', message: 'Provide name, email, password' });

    // Restrict roles creation (only 'user' by default unless admin creates)
    const newUser = await User.create({ name, email, password, role: role || 'user' });
    createSendToken(newUser, res);
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ status: 'fail', message: 'Email already in use' });
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ status: 'fail', message: 'Provide email and password' });

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.correctPassword(password))) {
      return res.status(401).json({ status: 'fail', message: 'Incorrect email or password' });
    }
    createSendToken(user, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};

// Rate limiter for forgot-password
exports.forgotLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { status: 'fail', message: 'Too many password reset attempts, try again later.' }
});

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ status: 'fail', message: 'Provide email' });

    const user = await User.findOne({ email });
    if (user) {
      const resetToken = user.createPasswordResetToken();
      await user.save({ validateBeforeSave: false });

      const resetURL = `${req.protocol}://${req.get('host')}/api/auth/reset-password/${resetToken}`;

      const message = `You requested a password reset. Use the link below to reset your password (valid for ${process.env.RESET_TOKEN_EXPIRES_MIN || 20} minutes):\n\n${resetURL}\n\nIf you didn't request, ignore this.`;
      try {
        await sendEmail({ to: user.email, subject: 'Password reset', text: message, html: `<p>${message.split('\n').join('<br/>')}</p>` });
      } catch (emailErr) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });
        console.error('Email send error', emailErr);
      }
    }

    // Generic response to avoid email enumeration
    res.status(200).json({ status: 'success', message: 'If an account with that email exists, a reset link has been sent.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const token = req.params.token;
    const { password } = req.body;
    if (!password) return res.status(400).json({ status: 'fail', message: 'Provide new password' });

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    }).select('+password');

    if (!user) return res.status(400).json({ status: 'fail', message: 'Token invalid or expired' });

    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    createSendToken(user, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};
