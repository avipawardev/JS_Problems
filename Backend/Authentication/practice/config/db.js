const mongoose = require('mongoose');

const connectToDB = async ()=>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/test');
        console.log("connected to db")
    } catch (error) {
        console.log("failled to connect with db")
    }
}
module.exports = connectToDB;