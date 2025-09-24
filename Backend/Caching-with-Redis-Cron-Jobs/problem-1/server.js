require("dotenv").config();
const express = require("express");
const { createClient } = require("redis");

const app = express();
app.use(express.json());

// In-memory "database"
let items = [
  { id: 1, name: "Pizza" },
  { id: 2, name: "Burger" },
];

const redisClient = createClient();
redisClient.connect();

redisClient.on("connect", () => console.log("✅ Connected to Redis"));
redisClient.on("error", (err) => console.error("❌ Redis error:", err));

const CACHE_KEY = "items:all";

// ========== ROUTES ==========

// GET /items (with caching)
app.get("/items", async (req, res) => {
  try {
    const cachedData = await redisClient.get(CACHE_KEY);

    if (cachedData) {
      console.log("🔵 Cache Hit");
      return res.json(JSON.parse(cachedData));
    }

    console.log("🟠 Cache Miss - Fetching from DB");
    // Simulate DB fetch
    await redisClient.set(CACHE_KEY, JSON.stringify(items), { EX: 60 }); // TTL 60s
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// POST /items (add new item + invalidate cache)
app.post("/items", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });

    const newItem = { id: items.length + 1, name };
    items.push(newItem);

    // Invalidate cache
    await redisClient.del(CACHE_KEY);
    console.log("❌ Cache invalidated after POST");

    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// PUT /items/:id (update item + invalidate cache)
app.put("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const item = items.find((i) => i.id === parseInt(id));
    if (!item) return res.status(404).json({ error: "Item not found" });

    item.name = name || item.name;

    // Invalidate cache
    await redisClient.del(CACHE_KEY);
    console.log("❌ Cache invalidated after PUT");

    res.json(item);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// DELETE /items/:id (delete item + invalidate cache)
app.delete("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const index = items.findIndex((i) => i.id === parseInt(id));
    if (index === -1) return res.status(404).json({ error: "Item not found" });

    const deletedItem = items.splice(index, 1);

    // Invalidate cache
    await redisClient.del(CACHE_KEY);
    console.log("❌ Cache invalidated after DELETE");

    res.json(deletedItem[0]);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ========== START SERVER ==========
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
