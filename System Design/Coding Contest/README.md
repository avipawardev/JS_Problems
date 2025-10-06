# Collaborative Task Board Application

A fullstack task board application with JWT authentication and role-based authorization (Admin/Member).

## Features

- **Authentication**: JWT-based login/register system
- **Authorization**: Role-based access (Admin/Member)
- **Task Management**: Create, update, delete tasks
- **Real-time Board**: Kanban-style task board (To Do, In Progress, Done)
- **Role Permissions**:
  - Members: Can create and edit their own tasks
  - Admins: Can delete any task and manage users

## Tech Stack

**Backend:**
- Node.js + Express
- JWT for authentication
- bcryptjs for password hashing
- In-memory storage (easily replaceable with database)

**Frontend:**
- React 18
- Context API for state management
- Axios for API calls
- Responsive CSS

## Setup Instructions

### Backend Setup
```bash
cd server
npm install
npm run dev
```

### Frontend Setup
```bash
cd client
npm install
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - Login user

### Tasks
- `GET /api/tasks` - Get all tasks (authenticated)
- `POST /api/tasks` - Create task (authenticated)
- `PUT /api/tasks/:id` - Update task (authenticated, owner or admin)
- `DELETE /api/tasks/:id` - Delete task (admin only)

### Users
- `GET /api/users` - Get all users (admin only)

## Default Test Users

You can register new users or create test data by registering with different roles:
- Role: "admin" for admin privileges
- Role: "member" for regular user privileges

## Usage

1. Start both backend (port 5000) and frontend (port 5173)
2. Register a new account or login
3. Create tasks and move them between columns
4. Admin users can delete tasks and view all users

## Security Features

- JWT token authentication
- Password hashing with bcrypt
- Role-based route protection
- CORS enabled for frontend communication