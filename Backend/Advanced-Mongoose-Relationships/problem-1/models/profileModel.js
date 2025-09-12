const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    bio: String,
    socialMediaLinks: [String],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true }
});

const profileModel = mongoose.model('Profile',profileSchema);
module.exports = profileModel;