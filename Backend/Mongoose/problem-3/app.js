const express = require('express');
const connectDB = require('./config/db');
const app = express();



app.listen(3000,()=>{
    connectDB();
    console.log("Server is running on port 3000")
})