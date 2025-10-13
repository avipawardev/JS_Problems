require('dotenv').config();
const connectDB = require('./config/db');
const seedDatabase = require('./utils/seedData');

connectDB().then(() => {
  seedDatabase().then(() => {
    console.log('Seeding complete');
    process.exit(0);
  });
});
