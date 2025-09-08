const mongoose = require('mongoose');

const connectToDb = async ()=>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/Task');
        console.log('connected to the DB')
    } catch (error) {
        console.log('Failled to connect with DB')
    }
};

module.exports = connectToDb;