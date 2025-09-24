const express = require("express");
const Book = require("../models/Book");
const redisClient = require("../utils/redisClient");
const auth = require("../middleware/auth");

const router = express.Router();

// Helper: user-specific cache key
const booksCacheKey = (userId) => `books:${userId}:all`;

// GET all books (cached per user)
router.get("/", auth, async (req, res) => {
  try {
    const cacheKey = booksCacheKey(req.user._id);
    const cached = await redisClient.get(cacheKey);

    if (cached) {
      console.log("🔵 Cache Hit");
      return res.json(JSON.parse(cached));
    }

    console.log("🟠 Cache Miss");
    const books = await Book.find({ user: req.user._id });

    await redisClient.set(cacheKey, JSON.stringify(books), { EX: 60 }); // cache 1 min
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST add book
router.post("/", auth, async (req, res) => {
  try {
    const book = await Book.create({ ...req.body, user: req.user._id });
    await redisClient.del(booksCacheKey(req.user._id));
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update book
router.put("/:id", auth, async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!book) return res.status(404).json({ message: "Book not found" });

    await redisClient.del(booksCacheKey(req.user._id));
    res.json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE book
router.delete("/:id", auth, async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!book) return res.status(404).json({ message: "Book not found" });

    await redisClient.del(booksCacheKey(req.user._id));
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST bulk books (queued in Redis)
router.post("/bulk", auth, async (req, res) => {
  try {
    const books = req.body.books;
    if (!Array.isArray(books) || books.length === 0) {
      return res.status(400).json({ message: "Provide an array of books" });
    }

    const bulkKey = `bulkBooks:${req.user._id}`;
    await redisClient.rPush(bulkKey, JSON.stringify(books));
    res.json({ message: "Books will be added later via cron job" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
