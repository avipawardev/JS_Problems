models/addressModel.js
const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  country: { type: String, default: 'India' },
  pincode: Number,
});

// 👉 exporting schema (not model)
module.exports = addressSchema;



models/userModel.js
const mongoose = require('mongoose');
const addressSchema = require('./addressModel');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  addresses: [addressSchema] // subdocuments
});

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;