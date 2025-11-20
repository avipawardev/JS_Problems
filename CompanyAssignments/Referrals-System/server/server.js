require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const authRouter = require("./routes/authRoutes");
const candidateRouter = require("./routes/candidateRoutes");
const app = express();

app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: "*", // Allow all origins (change to specific domain in production)
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use("/auth", authRouter);
app.use("/candidates", candidateRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`server started on port:${process.env.PORT || 3000}`);
  connectDB();
});
