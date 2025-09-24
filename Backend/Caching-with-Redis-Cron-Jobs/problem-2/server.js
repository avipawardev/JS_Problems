require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const bookRoutes = require("./routes/books");
require("./cron/bulkProcessor");

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("DB connection error:", err));
