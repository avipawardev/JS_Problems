const mongoose = require('mongoose');

const connectToDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('connected with db')
    } catch (error) {
        console.log('failled to connect with db')
    }
}

module.exports = connectToDb;