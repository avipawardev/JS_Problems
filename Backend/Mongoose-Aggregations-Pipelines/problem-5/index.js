const express = require('express');
const mongoose = require('mongoose');
const movieModel = require('./models/movie.model');
const userModel = require('./models/user.model');
const bookingModel = require('./models/booking.model');
const connectToDb = require('./config/db');
const analyticsRouter = require('./routes/analytics.routes');
const app = express();
app.use(express.json());

// Create Routes
app.post('/movies', async (req, res) => {
  try {
    const movie = new movieModel(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/users', async (req, res) => {
  try {
    const user = new userModel(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/bookings', async (req, res) => {
  try {
    const { userId, movieId } = req.body;
    
    // Check if user and movie exist
    const userExists = await userModel.findById(userId);
    const movieExists = await movieModel.findById(movieId);
    
    if (!userExists || !movieExists) {
      return res.status(400).json({ error: 'User or movie not found' });
    }
    
    const booking = new bookingModel(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.use('/analytics', analyticsRouter);

app.listen(3000, () => {
    connectToDb();
    console.log('Server is running on port 3000');
});