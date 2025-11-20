require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const authRouter = require('./routes/authRoutes');
const candidateRouter = require('./routes/candidateRoutes');
const app = express();
app.use(express.json());
app.use(cors());
app.use('/auth',authRouter);
app.use('/candidates',candidateRouter);

app.listen(process.env.PORT || 3000,()=>{
    console.log(`server started on port:${process.env.PORT || 3000}`)
    connectDB();
})