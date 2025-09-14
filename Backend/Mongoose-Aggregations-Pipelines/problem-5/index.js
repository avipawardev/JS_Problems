const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/moviebooking')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Schemas
const movieSchema = new mongoose.Schema({
  _id: String,
  title: String,
  genre: String,
  releaseYear: Number,
  durationMins: Number,
});

const userSchema = new mongoose.Schema({
  _id: String,
  name: String,
  email: String,
  joinedAt: Date,
});

const bookingSchema = new mongoose.Schema({
  _id: String,
  userId: String,
  movieId: String,
  bookingDate: Date,
  seats: Number,
  status: String,
});

// Models
const Movie = mongoose.model('Movie', movieSchema);
const User = mongoose.model('User', userSchema);
const Booking = mongoose.model('Booking', bookingSchema);

// Create Routes
app.post('/movies', async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
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
    const userExists = await User.findById(userId);
    const movieExists = await Movie.findById(movieId);
    
    if (!userExists || !movieExists) {
      return res.status(400).json({ error: 'User or Movie not found' });
    }
    
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Analytics Routes using Aggregation

// Route 1: Total bookings and seats per movie
app.get('/analytics/movie-bookings', async (req, res) => {
  try {
    const result = await Booking.aggregate([
      { $match: { status: 'Booked' } },
      {
        $group: {
          _id: '$movieId',
          totalBookings: { $sum: 1 },
          totalSeats: { $sum: '$seats' }
        }
      },
      {
        $lookup: {
          from: 'movies',
          localField: '_id',
          foreignField: '_id',
          as: 'movie'
        }
      },
      { $unwind: '$movie' },
      {
        $project: {
          _id: 0,
          movieId: '$_id',
          movieTitle: '$movie.title',
          totalBookings: 1,
          totalSeats: 1
        }
      }
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route 2: Booking history for each user with movie titles
app.get('/analytics/user-bookings', async (req, res) => {
  try {
    const result = await Booking.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },
      {
        $lookup: {
          from: 'movies',
          localField: 'movieId',
          foreignField: '_id',
          as: 'movie'
        }
      },
      { $unwind: '$movie' },
      {
        $project: {
          _id: 0,
          userId: 1,
          userName: '$user.name',
          movieTitle: '$movie.title',
          bookingDate: 1,
          seats: 1,
          status: 1
        }
      },
      { $sort: { userId: 1, bookingDate: -1 } }
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route 3: Users who booked more than 2 times
app.get('/analytics/top-users', async (req, res) => {
  try {
    const result = await Booking.aggregate([
      {
        $group: {
          _id: '$userId',
          bookingCount: { $sum: 1 }
        }
      },
      { $match: { bookingCount: { $gt: 2 } } },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },
      {
        $project: {
          _id: 0,
          userId: '$_id',
          userName: '$user.name',
          email: '$user.email',
          bookingCount: 1
        }
      },
      { $sort: { bookingCount: -1 } }
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route 4: Total seats booked per genre
app.get('/analytics/genre-wise-bookings', async (req, res) => {
  try {
    const result = await Booking.aggregate([
      { $match: { status: 'Booked' } },
      {
        $lookup: {
          from: 'movies',
          localField: 'movieId',
          foreignField: '_id',
          as: 'movie'
        }
      },
      { $unwind: '$movie' },
      {
        $group: {
          _id: '$movie.genre',
          totalSeats: { $sum: '$seats' },
          totalBookings: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          genre: '$_id',
          totalSeats: 1,
          totalBookings: 1
        }
      },
      { $sort: { totalSeats: -1 } }
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route 5: Active bookings with movie and user details
app.get('/analytics/active-bookings', async (req, res) => {
  try {
    const result = await Booking.aggregate([
      { $match: { status: 'Booked' } },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },
      {
        $lookup: {
          from: 'movies',
          localField: 'movieId',
          foreignField: '_id',
          as: 'movie'
        }
      },
      { $unwind: '$movie' },
      {
        $project: {
          _id: 0,
          bookingId: '$_id',
          userName: '$user.name',
          userEmail: '$user.email',
          movieTitle: '$movie.title',
          genre: '$movie.genre',
          seats: 1,
          bookingDate: 1
        }
      },
      { $sort: { bookingDate: -1 } }
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});