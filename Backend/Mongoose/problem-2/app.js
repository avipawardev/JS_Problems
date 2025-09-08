const express = require('express');
const connectToDb = require('./config/db');
const taskRouter = require('./routes/task.routes');
const app = express();
app.use(express.json());


app.use('/tasks',taskRouter)

app.listen(3000,()=>{
    connectToDb();
    console.log("Server is running on port 3000");
})







