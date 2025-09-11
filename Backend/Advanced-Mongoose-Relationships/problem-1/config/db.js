const mongoose = require('mongoose');

const connectToDB = async()=>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/relationshipDB');
        console.log('connected to DB')
    } catch (error) {
        console.log('failled to connect with DB')
    }
}

module.exports = connectToDB;