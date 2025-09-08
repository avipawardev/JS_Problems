const mongoose = require('mongoose');

const connectToDb = async()=>{
   try {
    await mongoose.connect('mongodb://127.0.0.1:27017/TaskDB')
    console.log('connected to the DB')
   } catch (error) {
    console.log('Failed to connect with DB')
   }
};

module.exports = connectToDb;


