const mongoose = require('mongoose');

const libraryModel = new mongoose.Schema({
  title: String,  // For books
  author: String,
  status: String, // "available", "borrowed", "reserved"
  borrowerName: String,  // If borrowed
  borrowDate: Date,
  dueDate: Date,
  returnDate: Date,
  overdueFees: Number,  // Calculated on return if overdue
})

module.exports = mongoose.model('Library', libraryModel)