const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    street:String,
    city:String,
    state:String,
    country:{ type: String, default: 'India' },
    pincode:Number
});

module.exports = addressSchema;