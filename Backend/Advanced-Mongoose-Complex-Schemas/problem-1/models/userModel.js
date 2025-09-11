const mongoose = require('mongoose');
const addressSchema = require('./addressModel');

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    age:Number,
    addresses:[addressSchema]
});

const userModel = mongoose.model('User',userSchema);
module.exports = userModel;