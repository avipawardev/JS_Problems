const express = require('express');
const connectToDb = require('./config/db');
const studentRouter = require('./routes/student.routes');
const courseRouter = require('./routes/course.routes');
const enrollRoutes = require('./routes/enroll.routes');
const app = express();
app.use(express.json());
app.use('/students',studentRouter)
app.use('/courses',courseRouter);
app.use('/enroll',enrollRoutes);

app.listen(3000, () => {
    connectToDb();
    console.log('Server is running on port 3000');
});