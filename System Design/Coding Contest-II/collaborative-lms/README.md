# Collaborative Learning Management System (LMS)

A full-featured Udemy-like Learning Management System built with the MERN stack, featuring real-time collaboration, course management, and payment integration.

## Features

### For Students
- 🔍 Browse and search courses with filters (category, level, price)
- 💳 Purchase courses (simulated payment with Razorpay/Stripe)
- 📚 Enroll in free courses
- 🎥 Watch video lessons
- ✅ Track progress and mark lessons complete
- 💬 Real-time comments and discussions
- 📊 Personal dashboard with enrolled courses
- 👤 Profile with purchase history

### For Instructors
- 📝 Create and manage courses
- 🎬 Add video lessons with descriptions
- 💰 Set course pricing
- 👥 View enrolled students
- 📊 Track course performance
- 🗑️ Edit and delete courses

### Real-time Features (Socket.IO)
- Live comments and replies
- Real-time activity feed
- Instant course updates
- Live enrollment notifications

## Tech Stack

### Backend
- **Node.js** & **Express.js** - Server framework
- **MongoDB** & **Mongoose** - Database
- **Socket.IO** - Real-time communication
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **React** - UI framework
- **React Router** - Navigation
- **Axios** - API calls
- **Socket.IO Client** - Real-time updates
- **Tailwind CSS** - Styling

## Project Structure

```
collaborative-lms/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Course.js
│   │   ├── Lesson.js
│   │   ├── Comment.js
│   │   ├── Order.js
│   │   └── Activity.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── courseController.js
│   │   ├── lessonController.js
│   │   ├── commentController.js
│   │   ├── orderController.js
│   │   └── activityController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── courseRoutes.js
│   │   ├── lessonRoutes.js
│   │   ├── commentRoutes.js
│   │   ├── orderRoutes.js
│   │   └── activityRoutes.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   ├── sockets/
│   │   └── socketManager.js
│   ├── utils/
│   │   └── generateToken.js
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Sidebar.jsx
    │   │   ├── CourseCard.jsx
    │   │   ├── LessonCard.jsx
    │   │   ├── LessonPlayer.jsx
    │   │   ├── CommentBox.jsx
    │   │   ├── CheckoutForm.jsx
    │   │   └── ActivityFeed.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Signup.jsx
    │   │   ├── InstructorDashboard.jsx
    │   │   ├── StudentDashboard.jsx
    │   │   ├── CoursePage.jsx
    │   │   ├── LessonPage.jsx
    │   │   ├── Checkout.jsx
    │   │   └── Profile.jsx
    │   ├── context/
    │   │   ├── AuthContext.jsx
    │   │   └── SocketContext.jsx
    │   ├── hooks/
    │   │   ├── useAuth.js
    │   │   ├── useSocket.js
    │   │   └── usePagination.js
    │   ├── api/
    │   │   └── axiosInstance.js
    │   └── App.jsx
    └── package.json
```

## Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/collaborative-lms
JWT_SECRET=your_jwt_secret_key_here
PORT=5001
```

4. Start the server:
```bash
npm start
# or for development
npm run dev
```

Server will run on `http://localhost:5001`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Courses
- `GET /api/courses` - Get all courses (with filters)
- `GET /api/courses/:id` - Get single course
- `POST /api/courses` - Create course (Instructor only)
- `PUT /api/courses/:id` - Update course (Instructor only)
- `DELETE /api/courses/:id` - Delete course (Instructor only)
- `GET /api/courses/instructor/my-courses` - Get instructor's courses
- `POST /api/courses/:id/enroll` - Enroll in course

### Lessons
- `GET /api/lessons/course/:courseId` - Get course lessons (with pagination)
- `GET /api/lessons/:id` - Get single lesson
- `POST /api/lessons` - Create lesson (Instructor only)
- `POST /api/lessons/:id/complete` - Mark lesson complete
- `PUT /api/lessons/course/:courseId/reorder` - Reorder lessons

### Comments
- `GET /api/comments/lesson/:lessonId` - Get lesson comments
- `POST /api/comments` - Create comment
- `DELETE /api/comments/:id` - Delete comment

### Orders
- `POST /api/orders` - Create order (purchase course)
- `GET /api/orders/my-orders` - Get user's orders
- `GET /api/orders/:id` - Get order details

### Activities
- `GET /api/activities` - Get recent activities

## Real-time Events (Socket.IO)

### Events Emitted by Server
- `lesson_added` - New lesson added to course
- `lesson_reordered` - Lessons reordered
- `comment_added` - New comment posted
- `comment_deleted` - Comment deleted
- `activity_update` - New activity logged

### Events Emitted by Client
- `join-course` - Join course room
- `join-lesson` - Join lesson room
- `comment_added` - New comment posted
- `comment_deleted` - Comment deleted

## Features in Detail

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (Student, Instructor, Admin)
- Protected routes and API endpoints

### Course Management
- Create, edit, delete courses
- Set price, category, level
- Upload thumbnail images
- Publish/unpublish courses

### Lesson Management
- Add video lessons with URLs
- Set lesson order
- Track lesson completion
- Video player with controls

### Payment System
- Simulated payment gateway (Razorpay/Stripe)
- Order tracking
- Purchase history
- Free course enrollment

### Real-time Features
- Live comments and replies
- Instant activity updates
- Real-time enrollment notifications
- Live course updates

### Search & Filters
- Search by title/description
- Filter by category
- Filter by level
- Pagination support

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- Role-based access control
- Input validation
- XSS protection

## Future Enhancements

- [ ] Video upload to cloud storage (Cloudinary/AWS S3)
- [ ] Real payment gateway integration
- [ ] Course reviews and ratings
- [ ] Quiz and assignments
- [ ] Certificates of completion
- [] Email notifications
- [ ] Admin dashboard
- [ ] Course analytics
- [ ] Live video classes
- [ ] Mobile app

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email support@learnhub.com or join our Slack channel.

---

Built with ❤️ using MERN Stack
