const express = require('express');
const bookingModel = require('../models/booking.model');

const analyticsRouter = express.Router();

// Route 1: Total bookings and seats per movie
analyticsRouter.get('/movie-bookings', async(req, res) => {
  try {
    const result = await bookingModel.aggregate([
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

// Route 2: bookingModel history for each user with movie titles
analyticsRouter.get('/user-bookings', async (req, res) => {
  try {
    const result = await bookingModel.aggregate([
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
analyticsRouter.get('/top-users', async (req, res) => {
  try {
    const result = await bookingModel.aggregate([
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
analyticsRouter.get('/genre-wise-bookings', async (req, res) => {
  try {
    const result = await bookingModel.aggregate([
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
analyticsRouter.get('/active-bookings', async (req, res) => {
  try {
    const result = await bookingModel.aggregate([
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

module.exports = analyticsRouter;