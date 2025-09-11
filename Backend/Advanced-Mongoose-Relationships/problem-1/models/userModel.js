const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }
});

const userModel = mongoose.model('User',userSchema);
module.exports = userModel;