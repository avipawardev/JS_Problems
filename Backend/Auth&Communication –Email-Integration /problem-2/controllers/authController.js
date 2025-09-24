// controllers/authController.js
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const { sendEmail } = require('../utils/email');

const signToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d'
  });
};

const createSendToken = (user, res) => {
  const token = signToken(user._id);
  // Don't send password or reset fields
  user.password = undefined;
  res.status(200).json({ status: 'success', token, data: { user } });
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ status: 'fail', message: 'Provide name, email and password' });
    }

    // create user
    const user = await User.create({ name, email, password });
    createSendToken(user, res);
  } catch (err) {
    // Handle duplicate email error
    if (err.code === 11000 && err.keyValue && err.keyValue.email) {
      return res.status(400).json({ status: 'fail', message: 'Email already in use' });
    }
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

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ status: 'fail', message: 'Provide email' });

    // Find user (if exists)
    const user = await User.findOne({ email });
    if (user) {
      // create token and save hashed version in DB
      const resetToken = user.createPasswordResetToken();
      await user.save({ validateBeforeSave: false });

      // Construct reset URL (client-side route)
      const resetURL = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;

      // send email (do not disclose whether email existed to client)
      const message = `You requested a password reset. Click the link to reset your password:\n\n${resetURL}\n\nIf you didn't request, ignore. Link expires in ${process.env.RESET_TOKEN_EXPIRES_MIN || 20} minutes.`;
      try {
        await sendEmail({
          to: user.email,
          subject: 'Your password reset token (valid for a short time)',
          text: message,
          html: `<p>${message.split('\n').join('<br/>')}</p>`
        });
      } catch (emailErr) {
        // Cleanup if email sending fails
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });
        console.error('Email send error:', emailErr);
      }
    }

    // Generic response (do NOT reveal if email exists)
    res.status(200).json({
      status: 'success',
      message: 'If an account with that email exists, a reset link has been sent.'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const token = req.params.token;
    const { password: newPassword } = req.body;
    if (!newPassword) return res.status(400).json({ status: 'fail', message: 'Provide new password' });

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // find user with valid reset token and expiry
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    }).select('+password');

    if (!user) {
      return res.status(400).json({ status: 'fail', message: 'Token is invalid or expired' });
    }

    // update password and clear reset fields
    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save(); // triggers pre-save hash

    // Optionally, invalidate existing sessions by changing passwordChangedAt (handled in pre save)
    createSendToken(user, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};
