# Movie Booking System API

A complete Express.js API with Mongoose aggregation pipelines for managing movies, users, and bookings.

## Setup

1. Make sure MongoDB is running on `mongodb://localhost:27017`
2. Install dependencies: `npm install`
3. Start the server: `node index.js`

## API Endpoints

### Create Routes

#### POST /movies
Create a new movie
```json
{
  "_id": "M1",
  "title": "Avengers",
  "genre": "Action",
  "releaseYear": 2019,
  "durationMins": 180
}
```

#### POST /users
Register a new user
```json
{
  "_id": "U1",
  "name": "John Doe",
  "email": "john@example.com",
  "joinedAt": "2023-01-15T00:00:00.000Z"
}
```

#### POST /bookings
Create a booking (validates user and movie exist)
```json
{
  "_id": "B1",
  "userId": "U1",
  "movieId": "M1",
  "bookingDate": "2024-01-10T00:00:00.000Z",
  "seats": 2,
  "status": "Booked"
}
```

### Analytics Routes (Aggregation Pipelines)

#### GET /analytics/movie-bookings
Get total bookings and seats per movie
- Groups bookings by movie
- Shows total bookings and seats for each movie
- Only includes "Booked" status

#### GET /analytics/user-bookings
Get booking history for each user with movie titles
- Shows all bookings with user and movie details
- Sorted by user and booking date

#### GET /analytics/top-users
Find users who booked more than 2 times
- Groups bookings by user
- Filters users with >2 bookings
- Sorted by booking count (descending)

#### GET /analytics/genre-wise-bookings
Total seats booked per genre
- Groups by movie genre
- Shows total seats and bookings per genre
- Only includes "Booked" status

#### GET /analytics/active-bookings
Get all active bookings with movie and user details
- Shows only "Booked" status bookings
- Includes complete user and movie information
- Sorted by booking date (newest first)

## Testing with Sample Data

Use the sample data from `sample-data.js` to test the API endpoints using tools like Postman or curl.

## Key Aggregation Features Used

- `$lookup`: Join collections (users, movies, bookings)
- `$unwind`: Flatten arrays from lookups
- `$group`: Group documents and calculate aggregates
- `$match`: Filter documents
- `$project`: Shape output documents
- `$sort`: Sort results