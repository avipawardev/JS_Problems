const mongoose = require('mongoose');

const connectToDb = async()=>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/ERModeling');
        console.log('connected to DB')
    } catch (error) {
        console.log('failled to connect with db')
    }
};

module.exports = connectToDb;