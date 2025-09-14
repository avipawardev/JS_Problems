const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
  _id: String,
  name: String,
  email: String,
  joinedAt: Date,
});

const userModel = mongoose.model('User', userSchema);   
module.exports = userModel;