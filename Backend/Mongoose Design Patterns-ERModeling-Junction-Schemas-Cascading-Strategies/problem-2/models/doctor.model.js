const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  isActive: { type: Boolean, default: true }
})

const doctorModel = mongoose.model('Doctor',doctorSchema);
module.exports = doctorModel;