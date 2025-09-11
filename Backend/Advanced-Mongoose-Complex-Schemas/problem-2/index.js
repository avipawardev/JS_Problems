const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// Middleware
app.use(express.json());

// DB Connection
connectDB();

// Routes
app.use("/", userRoutes);

// Error Handling
app.use(errorHandler);

app.listen(3000, () => console.log("🚀 Server running on port 3000"));
