// Sample data for testing the Movie Booking System API

// Sample Movies
const movies = [
  { _id: "M1", title: "Avengers", genre: "Action", releaseYear: 2019, durationMins: 180 },
  { _id: "M2", title: "Titanic", genre: "Romance", releaseYear: 1997, durationMins: 195 },
  { _id: "M3", title: "Inception", genre: "Sci-Fi", releaseYear: 2010, durationMins: 148 },
  { _id: "M4", title: "The Dark Knight", genre: "Action", releaseYear: 2008, durationMins: 152 }
];

// Sample Users
const users = [
  { _id: "U1", name: "John Doe", email: "john@example.com", joinedAt: new Date("2023-01-15") },
  { _id: "U2", name: "Jane Smith", email: "jane@example.com", joinedAt: new Date("2023-02-20") },
  { _id: "U3", name: "Bob Johnson", email: "bob@example.com", joinedAt: new Date("2023-03-10") }
];

// Sample Bookings
const bookings = [
  { _id: "B1", userId: "U1", movieId: "M1", bookingDate: new Date("2024-01-10"), seats: 2, status: "Booked" },
  { _id: "B2", userId: "U1", movieId: "M2", bookingDate: new Date("2024-01-15"), seats: 1, status: "Booked" },
  { _id: "B3", userId: "U1", movieId: "M3", bookingDate: new Date("2024-01-20"), seats: 3, status: "Booked" },
  { _id: "B4", userId: "U2", movieId: "M1", bookingDate: new Date("2024-01-12"), seats: 4, status: "Booked" },
  { _id: "B5", userId: "U2", movieId: "M4", bookingDate: new Date("2024-01-18"), seats: 2, status: "Cancelled" },
  { _id: "B6", userId: "U3", movieId: "M2", bookingDate: new Date("2024-01-25"), seats: 1, status: "Booked" }
];

module.exports = { movies, users, bookings };