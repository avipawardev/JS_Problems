const mongoose = require('mongoose');

const connectDB = async () => {
    try {
         await mongoose.connect('mongodb://127.0.0.1:27017/Task');
        console.log('connected to the DB')
    }catch(error){
        console.error('MongoDB connection error:', error);
    }
}

module.exports = connectDB;