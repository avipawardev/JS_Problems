const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  _id: String,
  userId: String,
  movieId: String,
  bookingDate: Date,
  seats: Number,
  status: String,
});

const bookingModel = mongoose.model('Booking', bookingSchema);
module.exports = bookingModel;