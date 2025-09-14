// MongoDB Connection

const mongoose = require('mongoose');

const connectToDb = ()=>{
mongoose.connect('mongodb://localhost:27017/moviebooking')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));
}
module.exports = connectToDb;