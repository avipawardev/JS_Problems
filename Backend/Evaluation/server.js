require('dotenv').config()
const PORT = process.env.PORT;
const express = require('express');
const connectToDb = require('./config/db');
const authRouter = require('./routes/auth.route');
const app = express();
app.use(express.json());
app.use('/auth',authRouter);



app.listen(PORT,()=>{
    connectToDb()
    console.log(`server is started on port ${PORT}`)
})

