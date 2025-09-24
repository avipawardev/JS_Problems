// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 8, select: false },

  // password reset:
  passwordResetToken: String, // hashed token
  passwordResetExpires: Date,

  // to invalidate tokens when password changes
  passwordChangedAt: Date
}, { timestamps: true });

// Hash password before save if modified
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '12', 10);
  this.password = await bcrypt.hash(this.password, saltRounds);
  this.passwordChangedAt = Date.now() - 1000; // ensure token issued after change
  next();
});

userSchema.methods.correctPassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Create reset token, store hashed version in DB and return plain token
userSchema.methods.createPasswordResetToken = function() {
  const rawToken = crypto.randomBytes(32).toString('hex'); // 64 chars
  const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');

  this.passwordResetToken = hashedToken;
  const minutes = parseInt(process.env.RESET_TOKEN_EXPIRES_MIN || '20', 10);
  this.passwordResetExpires = Date.now() + minutes * 60 * 1000; // expiry in ms

  return rawToken; // THIS is sent in email
};

// Check if user changed password after JWT issued
userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

module.exports = mongoose.model('User', userSchema);
