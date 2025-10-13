# Collaborative Learning Management System (LMS)

A full-stack collaborative LMS built with Node.js, Express, MongoDB, React, and Socket.IO.

## Features

- User authentication (Students & Instructors)
- Course management
- Lesson creation and viewing
- Real-time commenting system
- Activity feed
- Role-based access control

## Tech Stack

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- Socket.IO for real-time features
- JWT authentication
- bcryptjs for password hashing

### Frontend
- React 18
- React Router for navigation
- Tailwind CSS for styling
- Axios for API calls
- Socket.IO client

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB

### Installation

1. Clone the repository
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

4. Set up environment variables in `backend/.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/collaborative-lms
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

5. Start MongoDB service

6. Run the backend:
   ```bash
   cd backend
   npm run dev
   ```

7. Run the frontend:
   ```bash
   cd frontend
   npm start
   ```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register user
- POST `/api/auth/login` - Login user

### Courses
- GET `/api/courses` - Get all courses
- POST `/api/courses` - Create course (instructor only)
- POST `/api/courses/:id/enroll` - Enroll in course

### Lessons
- GET `/api/lessons/course/:courseId` - Get lessons for course
- GET `/api/lessons/:id` - Get specific lesson
- POST `/api/lessons` - Create lesson

### Comments
- GET `/api/comments/lesson/:lessonId` - Get comments for lesson
- POST `/api/comments` - Create comment

### Activities
- GET `/api/activities` - Get recent activities
- POST `/api/activities` - Create activity

## Real-time Features

The application uses Socket.IO for real-time features:
- Live commenting on lessons
- Real-time activity updates

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request