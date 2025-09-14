const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  isActive: { type: Boolean, default: true }
})

const patientModel = mongoose.model('Patient',patientSchema);
module.exports = patientModel;