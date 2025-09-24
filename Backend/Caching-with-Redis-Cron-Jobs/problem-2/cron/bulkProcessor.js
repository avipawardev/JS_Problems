const cron = require("node-cron");
const redisClient = require("../utils/redisClient");
const Book = require("../models/Book");

// Every 2 minutes
cron.schedule("*/2 * * * *", async () => {
  try {
    console.log("⏰ Cron Job Running: Processing bulk books");

    // Find all keys starting with bulkBooks:
    const keys = await redisClient.keys("bulkBooks:*");

    for (const key of keys) {
      const userId = key.split(":")[1];
      const bulkArrays = await redisClient.lRange(key, 0, -1);

      for (const arr of bulkArrays) {
        const books = JSON.parse(arr);
        const booksWithUser = books.map((b) => ({ ...b, user: userId }));
        await Book.insertMany(booksWithUser);
      }

      await redisClient.del(key);
      await redisClient.del(`books:${userId}:all`); // invalidate cache
      console.log(`✅ Processed bulk books for user ${userId}`);
    }
  } catch (err) {
    console.error("❌ Cron job error:", err);
  }
});
